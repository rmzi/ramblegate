.PHONY: serve push

push-dev:
	aws s3 sync . s3://site-dev-s3-site-yptsh --exclude "*.git/*" --exclude "Makefile" --exclude ".gitignore" --exclude "*.DS_Store*" --exclude "*design/*"

push-prod:
	aws s3 sync . s3://site-prod-s3-site-ovvkb --exclude "*.git/*" --exclude "Makefile" --exclude ".gitignore" --exclude "*.DS_Store*" --exclude "*design/*"