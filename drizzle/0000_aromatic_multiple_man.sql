CREATE TABLE IF NOT EXISTS "modems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"valid_since" text NOT NULL,
	"tags" json NOT NULL,
	CONSTRAINT "modems_name_unique" UNIQUE("name")
);
