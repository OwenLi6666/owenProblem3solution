.PHONY: all install build start dev clean

all: install build start

install:
	npm install

build:
	npm run build

start:
	npm start

dev:
	npm run dev

clean:
	if exist node_modules rmdir /s /q node_modules
	if exist dist rmdir /s /q dist
	if exist package-lock.json del package-lock.json
	if exist yarn.lock del yarn.lock 