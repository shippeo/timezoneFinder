SHELL := $(shell which bash)
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

.DEFAULT_GOAL := help

LOGS_LINE_NUM = 200

ifndef DEBUG
.SILENT: ;
endif

ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)) #split argument from make
EVAL := $$(eval $(ARGS):dummy;@:) #split argument from make
OPTS := #OPTS passed to targets OPTS="--xxx"

# Get the main unix group for the user running make (to be used by docker-compose later)
GID ?= $(shell id -g)

# Get the unix user id for the user running make (to be used by docker-compose later)
UID ?= $(shell id -u)

DOCKER_COMPOSE := $(shell command -v docker-compose > /dev/null 2>&1 && echo "docker-compose" || echo "")

# Docker build
COMPOSE_DOCKER_CLI_BUILD ?= 1
DOCKER_BUILDKIT          ?= 1
BUILD_MODE               ?= production

export COMPOSE_DOCKER_CLI_BUILD
export DOCKER_BUILDKIT
export BUILD_MODE
export DOCKER_COMPOSE

include makefile.d/00-help.mk
include makefile.d/01-docker.mk