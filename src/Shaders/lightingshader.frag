#version 330 core

struct Material {
	sampler2D texture_diffuse1;
	sampler2D texture_specular1;
	sampler2D emission;
	float shininess;
};

//Directional light struct
struct DirLight {
	vec3 direction;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};
uniform DirLight dirLight;
vec3 CalcDirLight (DirLight light, vec3 normal, vec3 viewDir);

//Point light struct
struct PointLight {
	vec3 position;

	float constant;
	float linear;
	float quadratic;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};
#define NR_POINT_LIGHTS 4
uniform PointLight pointLights[NR_POINT_LIGHTS];
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir);

struct SpotLight {
	vec3 position;
	vec3 direction;
	float cutOff;
	float outerCutOff;

	float constant;
	float linear;
	float quadratic;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};
uniform SpotLight spotLight;
vec3 CalcSpotLight(SpotLight light, vec3 normal, vec3 fragPos, vec3 viewDir);


in vec2 TexCoords;
in vec3 Normal;
in vec3 FragPos;

out vec4 FragColor;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform Material material;
uniform vec3 viewPos;

void main()
{
	//properties
	vec3 norm = normalize(Normal);
	vec3 viewDir = normalize(viewPos - FragPos);
	vec3 result = vec3(0.0f);

	//Directional lighting
	result += CalcDirLight(dirLight, norm, viewDir);

	//Point lights
	for (int i = 0; i < NR_POINT_LIGHTS; ++i)
		result += CalcPointLight(pointLights[i], norm, FragPos, viewDir);

	//Spot light
	result += CalcSpotLight(spotLight, norm, FragPos, viewDir);

	//emission
	//result += texture(material.emission, TexCoords).rgb;
	FragColor = vec4(result, 1.0f);
}

vec3 CalcDirLight (DirLight light, vec3 normal, vec3 viewDir)
{
	vec3 LightDir = normalize(-light.direction);
	//diffuse shading
	float diff = max(dot(normal, LightDir), 0.0f);
	//specular shading
	vec3 reflectDir = reflect(-LightDir, normal);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0f), material.shininess);
	//combine
	vec3 ambient = light.ambient * texture(material.texture_diffuse1, TexCoords).rgb;
	vec3 diffuse = light.diffuse * diff * texture(material.texture_diffuse1, TexCoords).rgb;
	vec3 specular = light.specular * spec * texture(material.texture_specular1, TexCoords).rgb;
	return (ambient + diffuse + specular);
}

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
	vec3 lightDir = normalize(light.position - fragPos);
	//diffuse shading
	float diff = max(dot(lightDir, normal), 0.0f);
	//specular shading
	vec3 reflectDir = reflect(-lightDir, normal);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0f), material.shininess);
	//attenuation
	float dist = length(light.position - fragPos);
	float attenuation = 1.0f / (light.constant + light.linear * dist +
						light.quadratic * (dist * dist));
	//combine
	vec3 ambient = light.ambient * texture(material.texture_diffuse1, TexCoords).rgb;
	vec3 diffuse = light.diffuse * diff * texture(material.texture_diffuse1, TexCoords).rgb;
	vec3 specular = light.specular * spec * texture(material.texture_specular1, TexCoords).rgb;
	ambient *= attenuation;
	diffuse *= attenuation;
	specular *= attenuation;
	return (ambient + diffuse + specular);
}

vec3 CalcSpotLight(SpotLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
	vec3 lightDir = normalize(light.position - fragPos);
	//diffuse shading
	float diff = max(dot(normal, lightDir), 0.0f);
	//specular shading
	vec3 reflectDir = reflect(-lightDir, normal);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0f), material.shininess);
	//attenuation
	float dist = length(light.position - fragPos);
	float attenuation = 1.0f / (light.constant + light.linear * dist +
						light.quadratic * (dist * dist));
	//intensity
	float tetha = dot(lightDir, normalize(-light.direction));
	float epsilon = light.cutOff - light.outerCutOff;
	float intensity = clamp((tetha - light.outerCutOff) / epsilon, 0.0f, 1.0f);
	//combine
	vec3 ambient = light.ambient * texture(material.texture_diffuse1, TexCoords).rgb;
	vec3 diffuse = light.diffuse * diff * texture(material.texture_diffuse1, TexCoords).rgb;
	vec3 specular = light.specular * spec * texture(material.texture_specular1, TexCoords).rgb;
	ambient *= attenuation * intensity;
	diffuse *= attenuation * intensity;
	specular *= attenuation * intensity;
	return (ambient + diffuse + specular);

}