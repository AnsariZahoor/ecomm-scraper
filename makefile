# Define variables
IMAGE_NAME = ecomm-frontend
IMAGE_TAG = latest

-include .env.local


build:
	docker build --build-arg REACT_APP_API_URL=$(REACT_APP_API_URL) --build-arg REACT_APP_API_KEY=$(REACT_APP_API_KEY) -t $(IMAGE_NAME):$(IMAGE_TAG) .

test:
	docker run -d -p 80:80 $(IMAGE_NAME):$(IMAGE_TAG)
