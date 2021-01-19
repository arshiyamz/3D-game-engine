# 3D game engine
3D game engine built from the ground up using C++, OpenGL and GLSL.

Features:

moving camera

model loading

different lighting options (ambient, directional, diffuse, specular and flashlight)

Post-processing effects

Skybox


Source Codes are located under the /src folder, which also includes the Shaders.

The GLSL shaders are located under /src/Shaders
Fragment shader files end with a .frag and Vertex shader files end with a .vert

Headers including the Camera, Mesh, Model and Shader classes are located under /includes

Models and textures are included under /Resources



For the sake of simplicity, I am using the following libraries (while fully knowing how they work):

For managing windows I use the GLFW library found at https://github.com/glfw/glfw

For managing OpenGL function pointers I use GLAD found at https://github.com/Dav1dde/glad

For math operations I use GLM found at https://github.com/g-truc/glm

For this Project I am using a model loading library called Assimp which can be found at https://github.com/assimp/assimp

For loading textures I am using stb_image.h, a single header image loading library by Sean Barrett found at https://github.com/nothings/stb/blob/master/stb_image.h

The sample model included is a slightly modified version of the low poly Survival Guitar Backpack by Berk Gedik (https://sketchfab.com/3d-models/survival-guitar-backpack-low-poly-799f8c4511f84fab8c3f12887f7e6b36)

This 3D game engine is built with the help of the tutorials and explanations on https://learnopengl.com/ by Joey De Vires (https://twitter.com/JoeyDeVriez)
