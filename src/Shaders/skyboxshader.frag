#version 330 core
out vec4 FragColor;

in vec3 TexCoord;

uniform samplerCube skybox;

void main()
{
	FragColor = texture(skybox, TexCoord);
	//FragColor = vec4(0.1f, 0.2f, 0.3f, 1.0f);
}