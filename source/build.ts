import { buildWranglerToml } from "@aerofoil/af-ext-cloudflare/buildWranglerToml";
import { getTargetEnv } from "@aerofoil/aerofoil-core/util/getTargetEnv";
import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

//* import.meta.url is part of node types
//* this deployment is for cloudflare workers so the tsconfig reflects that
//* however this build file is run by node so we just override the type here
interface ImportMeta {
	url: string;
}

const envValidation = z.object({});
const env = await getTargetEnv((import.meta as ImportMeta).url, envValidation);

export type EnvType = ReadonlyDeep<z.infer<typeof envValidation>>;

await buildWranglerToml([{ vars: env }]);
