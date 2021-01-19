#pragma once
#ifndef CAMERA_H
#define CAMERA_H

#include <glad/glad.h>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>

#include <vector>

enum Camera_Movement {
	FORWARD,
	BACKWWARD,
	RIGHT,
	LEFT,
	UP,
	DOWN
};

const float YAW         = -90.0f;
const float PITCH	    = 0.0f;
const float SPEED	    = 2.5f;
const float SENSITIVITY = 0.1f;
const float ZOOM		= 45.0f;


class Camera
{
public:
	//Camera Attribs
	glm::vec3 Position;
	glm::vec3 Front;
	glm::vec3 Up;
	glm::vec3 Right;
	glm::vec3 WorldUp;
	//Euler Angles
	float Yaw;
	float Pitch;
	float Roll;
	//Camera options
	float MovementSpeed;
	float MouseSensitivity;
	float Zoom;

	//Constructors
	Camera(glm::vec3 position = glm::vec3(0.0f, 0.0f, 0.0f), glm::vec3 up = glm::vec3(0.0f, 1.0f, 0.0f), float yaw = YAW, float pitch = PITCH);// : Front(glm::vec3(0.0f, 0.0f, 0.0f)), MovementSpeed(SPEED), MouseSensitivity(SENSITIVITY), Zoom(ZOOM);
	Camera(float posX, float posY, float posZ, float upX, float upY, float upZ, float yaw, float pitch);// : Front(glm::vec3(0.0f, 0.0f, -1.0f)), MovementSpeed(SPEED), MouseSensitivity(SENSITIVITY), Zoom(ZOOM);

	//Return view matrix
	glm::mat4 GetViewMatrix();

	//Process keyboard input
	void ProcessKeyboard(Camera_Movement direction, float deltaTime);

	//Process mouse movement input
	void ProcessMouseMovement(float xoffset, float yoffset, GLboolean constrainPitch = true);

	//Process mouse scroll input
	void ProcessMouseScroll(float yoffset);

private:
	void updateCameraVectors();
};

#endif // !CAMERA_H

