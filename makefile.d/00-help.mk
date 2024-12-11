.PHONY: help
help: ## <00. ℹ️  Help> Display this help.
	sed -e '/#\{2\} /!d; s/[?=:][^#]*##/:/; s/#\s*\([^#]\+\)##/\1:/; s/\([^:?]*\):\s<\([^>]*\)>\s\(.*\)/\2:\1:\3/; s/\([^:]*\):\s\([^<]*.*\)/Misc.:\1:\2/' $(MAKEFILE_LIST) | \
	sort -t: -d | \
	awk 'BEGIN{FS=":"; section=""} { if ($$1 != section) { section=$$1; printf "\n\033[1m%s\033[0m\n", $$1 } printf "\t\033[92m%s\033[0m:%s\n", $$2, $$3 }' | \
	column -c2 -t -s :
