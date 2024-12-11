.PHONY: install
install: ## <10. 🐳 Docker> Check config files, destroy, rebuild, start containers
install: destroy buildImage start

.PHONY: buildImage
buildImage: ## <10. 🐳 Docker> Build the containers (BUILD_MODE=(*production|development))
	$(DOCKER_COMPOSE) build --no-cache --build-arg UID=$(UID) --build-arg GID=$(GID) $(ARGS)


.PHONY: start
start: ## <10. 🐳 Docker> Start the containers
	$(DOCKER_COMPOSE) up --build -d

.PHONY: restart
restart: ## <10. 🐳 Docker> Restart the containers
	$(DOCKER_COMPOSE) restart $(ARGS)

.PHONY: stop
stop: ## <10. 🐳 Docker> Stop the containers
	$(DOCKER_COMPOSE) stop $(ARGS)

.PHONY: destroy
destroy: stop ## <10. 🐳 Docker> Destroy the containers
	$(DOCKER_COMPOSE) rm -v -f $(ARGS)

.PHONY: reset
reset: ## <10. 🐳 Docker> Remove all containers, volumes and networks
	@echo -n "Are you sure? [y/N] " && read ans && \
	if [ $${ans:-N} = y ]; then \
		$(DOCKER_COMPOSE) down -v --remove-orphans; \
		$(MAKE) --quiet start; \
	fi

.PHONY: ps
ps: ## <10. 🐳 Docker> Check all container status
	docker ps

.PHONY: logs
logs: ## <10. 🐳 Docker> Get docker log for container
	$(DOCKER_COMPOSE) logs $(ARGS)


.PHONY: bash
bash: ## <10. 🐳 Docker> Open a bash inside a container
ifneq ($(strip $(ARGS)),)
	$(DOCKER_COMPOSE) run --rm $(ARGS) /bin/bash
else
	@echo Usage: make bash {container}
	@exit 1
endif

.PHONY: docker-%
docker-%: ## <10. 🐳 Docker> Run any other target in Docker (where '%' = target name)
docker-%:
	$(DOCKER_COMPOSE) run --rm cli make $* $(ARGS) OPTS=$(OPTS)
