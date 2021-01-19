#pragma once
#ifndef MESH_H
#define MESH_H

#include <Shader.h>
#include <vector>

using namespace std;

struct Vertex {
	glm::vec3 Position;
	glm::vec3 Normal;
	glm::vec2 TexCoord;
	glm::vec3 Tangent;
	glm::vec3 Bitangent;
};

struct Texture {
	unsigned int id;
	string type;
	string path;
};

class Mesh {
public:
	//Mesh data
	vector <Vertex> vertices;
	vector <unsigned int> indices;
	vector <Texture> textures;
	unsigned int VAO;

	Mesh(vector <Vertex> vertices, vector <unsigned int> indices, vector <Texture> textures);
	void Draw(Shader shader);
private:
	//Render data
	unsigned int VBO, EBO;

	void setupMesh();
};


#endif // !MESH_H

