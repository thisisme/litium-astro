/// <reference types="astro/client" />

declare namespace App {
  interface Locals extends Record<string, any> {
    errors: [
      {
        message: string,
        locations: [
          {
            line: number,
            column: number,
          }
        ],
        path: string[],
        extensions: {
          typeCondition: string,
          specifiedBy: string,
        }
      }
    ]
  }
}
