.PHONY: serve deploy-dev deploy-prod

default: serve

serve:
	python3 -m http.server

deploy-dev:
	aws s3 sync . s3://site-dev-s3-site-yptsh --exclude "*.git/*" --exclude "Makefile" --exclude ".gitignore" --exclude "*.DS_Store*" --exclude "*design/*" --exact-timestamps

deploy-prod:
	aws s3 sync . s3://site-prod-s3-site-ovvkb --exclude "*.git/*" --exclude "Makefile" --exclude ".gitignore" --exclude "*.DS_Store*" --exclude "*design/*" --exact-timestamps