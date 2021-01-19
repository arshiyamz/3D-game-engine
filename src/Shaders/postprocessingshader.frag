#version 330 core

in vec2 TexCoords;

out vec4 FragColor;

uniform sampler2D screenTexture;

const float Offset = 1.0f / 300.0f;

vec4 InverseColor(vec4 color);
vec4 GrayscaleColor(vec4 color);
vec4 WeightedGrayscaleColor(vec4 color);
vec4 Kernel(float offset, float kernel[9]);

void main()
{
	float sharpenKernel[9] = float[](
		-1, -1, -1,
		-1,  9, -1,
		-1, -1, -1
	);

	float blurKernel[9] = float[](
		1.0f / 16.0f, 2.0f / 16.0f, 1.0f / 16.0f,
		2.0f / 16.0f, 4.0f / 16.0f, 2.0f / 16.0f,
		1.0f / 16.0f, 2.0f / 16.0f, 1.0f / 16.0f
	);

	float edgeKernel[9] = float[](
		1,  1, 1,
		1, -8, 1,
		1,  1, 1
	);

	vec4 color = Kernel(Offset, edgeKernel);
	FragColor = color;
	//FragColor = texture(screenTexture, TexCoords);
}

vec4 InverseColor(vec4 color)
{
	vec4 result = vec4(vec3(1.0f - color), 1.0f);
	return result;
}

vec4 GrayscaleColor(vec4 color)
{
	float average = (color.x + color.y + color.z) / 3.0f;
	vec4 result = vec4(vec3(average), 1.0f);
	return result;
}

vec4 WeightedGrayscaleColor(vec4 color)
{
	float average = 0.2126f * color.x + 0.7152f * color.y + 0.0722 * color.z;
	vec4 result = vec4(vec3(average), 1.0f);
	return result;
}

vec4 Kernel(float offset, float kernel[9])
{
	vec2 offsets[9] = vec2[](
		vec2(-offset,  offset),
		vec2(0.0f,     offset),
		vec2(offset,   offset),
		vec2(-offset,  0.0f),
		vec2(0.0f,     0.0f),
		vec2(offset,   0.0f),
		vec2(-offset, -offset),
		vec2(0.0f,    -offset),
		vec2(offset,  -offset)
	);
	
	vec3 sampleTex[9];
	for (int i = 0; i < 9; ++i)
		sampleTex[i] = vec3(texture(screenTexture, TexCoords + offsets[i]));
	vec3 result = vec3(0.0f);
	for (int i = 0; i < 9; ++i)
		result += sampleTex[i] * kernel[i];
	return vec4(result, 1.0f);
}