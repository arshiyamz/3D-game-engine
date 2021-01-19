#pragma once
#ifndef MODEL_H
#define MODEL_H

#include <Mesh.h>

#include <stb_image.h>

#include <assimp/Importer.hpp>
#include <assimp/scene.h>
#include <assimp/postprocess.h>

unsigned int TextureFromFile(const char* path, const string& directory, bool gamma = false);

class Model
{
public:
	//Model data
	vector <Texture> loaded_textures;
	vector <Mesh> meshes;
	string directory;
	bool gammaCorrection;

	Model(string const& path, bool gamma = false);
	void Draw(Shader shader);
private:
	void loadModel(string path);
	void processNode(aiNode* node, const aiScene* scene);
	Mesh processMesh(aiMesh* mesh, const aiScene* scene);
	vector <Texture> loadMaterialTextures(aiMaterial* material, aiTextureType type, string typeName);
};


#endif // !MODEL_H
