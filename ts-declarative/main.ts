import {getPrototypeValue } from "jsr:@fartlabs/declarative";
import { context, docOf } from "jsr:@fartlabs/declarative/common/jsonld";
import { jsonSchemaDecoratorFactoryOfFile, type ValueJSONSchema } from "jsr:@fartlabs/declarative/common/json-schema";
import jsonld from "npm:jsonld@^8.3.3"
import {Ajv}from "npm:ajv@^8.17.1";

const jsonSchema = await jsonSchemaDecoratorFactoryOfFile(import.meta.url);

@context("https://schema.org/")
@jsonSchema()
export class Person {
  public constructor(public name: string) {}
}

// deno task example
if (import.meta.main) {
  const ash = new Person("Ash Ketchum");
  const expandedAsh = await jsonld.expand(docOf(ash));
  console.log(expandedAsh);
  // Output:
  // [
  //   {
  //     "@type": "https://schema.org/Person",
  //     "https://schema.org/name": [ { "@value": "Ash Ketchum" } ]
  //   }
  // ]

  const ajv = new Ajv();
  const validate = ajv.compile(
    getPrototypeValue<ValueJSONSchema>(Person)?.jsonSchema,
  );
  const isValid = validate(ash);
  console.log(isValid);
}
