default: dev

dev: sync_schema
	@npm run dev

build:
	@npm run build

sync_schema:
	@echo Reading schema from $(PUBLIC_PB_HOST)
	@npx pocketbase-typegen --url $(PUBLIC_PB_HOST) --email $(PUBLIC_PB_ADMIN_EMAIL) --password $(PUBLIC_PB_ADMIN_PASSWORD) --out ./src/lib/pocketbase/pb.d.ts
