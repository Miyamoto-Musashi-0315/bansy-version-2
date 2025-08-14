
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model JobDescription
 * 
 */
export type JobDescription = $Result.DefaultSelection<Prisma.$JobDescriptionPayload>
/**
 * Model Candidate
 * 
 */
export type Candidate = $Result.DefaultSelection<Prisma.$CandidatePayload>
/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>
/**
 * Model Test
 * 
 */
export type Test = $Result.DefaultSelection<Prisma.$TestPayload>
/**
 * Model TestCase
 * 
 */
export type TestCase = $Result.DefaultSelection<Prisma.$TestCasePayload>
/**
 * Model TestFile
 * 
 */
export type TestFile = $Result.DefaultSelection<Prisma.$TestFilePayload>
/**
 * Model Submission
 * 
 */
export type Submission = $Result.DefaultSelection<Prisma.$SubmissionPayload>
/**
 * Model SubmissionEvent
 * --- NEW: GitHub / CI activity timeline ---
 */
export type SubmissionEvent = $Result.DefaultSelection<Prisma.$SubmissionEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  HR: 'HR',
  CANDIDATE: 'CANDIDATE'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobDescription`: Exposes CRUD operations for the **JobDescription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobDescriptions
    * const jobDescriptions = await prisma.jobDescription.findMany()
    * ```
    */
  get jobDescription(): Prisma.JobDescriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candidate`: Exposes CRUD operations for the **Candidate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Candidates
    * const candidates = await prisma.candidate.findMany()
    * ```
    */
  get candidate(): Prisma.CandidateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.test`: Exposes CRUD operations for the **Test** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tests
    * const tests = await prisma.test.findMany()
    * ```
    */
  get test(): Prisma.TestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testCase`: Exposes CRUD operations for the **TestCase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestCases
    * const testCases = await prisma.testCase.findMany()
    * ```
    */
  get testCase(): Prisma.TestCaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testFile`: Exposes CRUD operations for the **TestFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestFiles
    * const testFiles = await prisma.testFile.findMany()
    * ```
    */
  get testFile(): Prisma.TestFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submission`: Exposes CRUD operations for the **Submission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Submissions
    * const submissions = await prisma.submission.findMany()
    * ```
    */
  get submission(): Prisma.SubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submissionEvent`: Exposes CRUD operations for the **SubmissionEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubmissionEvents
    * const submissionEvents = await prisma.submissionEvent.findMany()
    * ```
    */
  get submissionEvent(): Prisma.SubmissionEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Company: 'Company',
    JobDescription: 'JobDescription',
    Candidate: 'Candidate',
    Resume: 'Resume',
    Test: 'Test',
    TestCase: 'TestCase',
    TestFile: 'TestFile',
    Submission: 'Submission',
    SubmissionEvent: 'SubmissionEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "company" | "jobDescription" | "candidate" | "resume" | "test" | "testCase" | "testFile" | "submission" | "submissionEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      JobDescription: {
        payload: Prisma.$JobDescriptionPayload<ExtArgs>
        fields: Prisma.JobDescriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobDescriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobDescriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload>
          }
          findFirst: {
            args: Prisma.JobDescriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobDescriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload>
          }
          findMany: {
            args: Prisma.JobDescriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload>[]
          }
          create: {
            args: Prisma.JobDescriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload>
          }
          createMany: {
            args: Prisma.JobDescriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobDescriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload>[]
          }
          delete: {
            args: Prisma.JobDescriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload>
          }
          update: {
            args: Prisma.JobDescriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload>
          }
          deleteMany: {
            args: Prisma.JobDescriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobDescriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobDescriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload>[]
          }
          upsert: {
            args: Prisma.JobDescriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobDescriptionPayload>
          }
          aggregate: {
            args: Prisma.JobDescriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobDescription>
          }
          groupBy: {
            args: Prisma.JobDescriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobDescriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobDescriptionCountArgs<ExtArgs>
            result: $Utils.Optional<JobDescriptionCountAggregateOutputType> | number
          }
        }
      }
      Candidate: {
        payload: Prisma.$CandidatePayload<ExtArgs>
        fields: Prisma.CandidateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandidateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandidateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          findFirst: {
            args: Prisma.CandidateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandidateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          findMany: {
            args: Prisma.CandidateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          create: {
            args: Prisma.CandidateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          createMany: {
            args: Prisma.CandidateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CandidateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          delete: {
            args: Prisma.CandidateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          update: {
            args: Prisma.CandidateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          deleteMany: {
            args: Prisma.CandidateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandidateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CandidateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          upsert: {
            args: Prisma.CandidateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          aggregate: {
            args: Prisma.CandidateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandidate>
          }
          groupBy: {
            args: Prisma.CandidateGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandidateGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandidateCountArgs<ExtArgs>
            result: $Utils.Optional<CandidateCountAggregateOutputType> | number
          }
        }
      }
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
      Test: {
        payload: Prisma.$TestPayload<ExtArgs>
        fields: Prisma.TestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          findFirst: {
            args: Prisma.TestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          findMany: {
            args: Prisma.TestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          create: {
            args: Prisma.TestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          createMany: {
            args: Prisma.TestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          delete: {
            args: Prisma.TestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          update: {
            args: Prisma.TestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          deleteMany: {
            args: Prisma.TestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          upsert: {
            args: Prisma.TestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          aggregate: {
            args: Prisma.TestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTest>
          }
          groupBy: {
            args: Prisma.TestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestCountArgs<ExtArgs>
            result: $Utils.Optional<TestCountAggregateOutputType> | number
          }
        }
      }
      TestCase: {
        payload: Prisma.$TestCasePayload<ExtArgs>
        fields: Prisma.TestCaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestCaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestCaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          findFirst: {
            args: Prisma.TestCaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestCaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          findMany: {
            args: Prisma.TestCaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>[]
          }
          create: {
            args: Prisma.TestCaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          createMany: {
            args: Prisma.TestCaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestCaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>[]
          }
          delete: {
            args: Prisma.TestCaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          update: {
            args: Prisma.TestCaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          deleteMany: {
            args: Prisma.TestCaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestCaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestCaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>[]
          }
          upsert: {
            args: Prisma.TestCaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestCasePayload>
          }
          aggregate: {
            args: Prisma.TestCaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestCase>
          }
          groupBy: {
            args: Prisma.TestCaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestCaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestCaseCountArgs<ExtArgs>
            result: $Utils.Optional<TestCaseCountAggregateOutputType> | number
          }
        }
      }
      TestFile: {
        payload: Prisma.$TestFilePayload<ExtArgs>
        fields: Prisma.TestFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload>
          }
          findFirst: {
            args: Prisma.TestFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload>
          }
          findMany: {
            args: Prisma.TestFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload>[]
          }
          create: {
            args: Prisma.TestFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload>
          }
          createMany: {
            args: Prisma.TestFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload>[]
          }
          delete: {
            args: Prisma.TestFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload>
          }
          update: {
            args: Prisma.TestFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload>
          }
          deleteMany: {
            args: Prisma.TestFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload>[]
          }
          upsert: {
            args: Prisma.TestFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestFilePayload>
          }
          aggregate: {
            args: Prisma.TestFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestFile>
          }
          groupBy: {
            args: Prisma.TestFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestFileCountArgs<ExtArgs>
            result: $Utils.Optional<TestFileCountAggregateOutputType> | number
          }
        }
      }
      Submission: {
        payload: Prisma.$SubmissionPayload<ExtArgs>
        fields: Prisma.SubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findFirst: {
            args: Prisma.SubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findMany: {
            args: Prisma.SubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          create: {
            args: Prisma.SubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          createMany: {
            args: Prisma.SubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          delete: {
            args: Prisma.SubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          update: {
            args: Prisma.SubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          upsert: {
            args: Prisma.SubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          aggregate: {
            args: Prisma.SubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmission>
          }
          groupBy: {
            args: Prisma.SubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionCountAggregateOutputType> | number
          }
        }
      }
      SubmissionEvent: {
        payload: Prisma.$SubmissionEventPayload<ExtArgs>
        fields: Prisma.SubmissionEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload>
          }
          findFirst: {
            args: Prisma.SubmissionEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload>
          }
          findMany: {
            args: Prisma.SubmissionEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload>[]
          }
          create: {
            args: Prisma.SubmissionEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload>
          }
          createMany: {
            args: Prisma.SubmissionEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload>[]
          }
          delete: {
            args: Prisma.SubmissionEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload>
          }
          update: {
            args: Prisma.SubmissionEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubmissionEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload>[]
          }
          upsert: {
            args: Prisma.SubmissionEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionEventPayload>
          }
          aggregate: {
            args: Prisma.SubmissionEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmissionEvent>
          }
          groupBy: {
            args: Prisma.SubmissionEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionEventCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    company?: CompanyOmit
    jobDescription?: JobDescriptionOmit
    candidate?: CandidateOmit
    resume?: ResumeOmit
    test?: TestOmit
    testCase?: TestCaseOmit
    testFile?: TestFileOmit
    submission?: SubmissionOmit
    submissionEvent?: SubmissionEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    jobDescriptions: number
    submissions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobDescriptions?: boolean | UserCountOutputTypeCountJobDescriptionsArgs
    submissions?: boolean | UserCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJobDescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobDescriptionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    users: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type JobDescriptionCountOutputType
   */

  export type JobDescriptionCountOutputType = {
    candidates: number
  }

  export type JobDescriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | JobDescriptionCountOutputTypeCountCandidatesArgs
  }

  // Custom InputTypes
  /**
   * JobDescriptionCountOutputType without action
   */
  export type JobDescriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescriptionCountOutputType
     */
    select?: JobDescriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobDescriptionCountOutputType without action
   */
  export type JobDescriptionCountOutputTypeCountCandidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateWhereInput
  }


  /**
   * Count Type CandidateCountOutputType
   */

  export type CandidateCountOutputType = {
    submissionEvents: number
  }

  export type CandidateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissionEvents?: boolean | CandidateCountOutputTypeCountSubmissionEventsArgs
  }

  // Custom InputTypes
  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCountOutputType
     */
    select?: CandidateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeCountSubmissionEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionEventWhereInput
  }


  /**
   * Count Type ResumeCountOutputType
   */

  export type ResumeCountOutputType = {
    candidates: number
  }

  export type ResumeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | ResumeCountOutputTypeCountCandidatesArgs
  }

  // Custom InputTypes
  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeCountOutputType
     */
    select?: ResumeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeCountCandidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateWhereInput
  }


  /**
   * Count Type TestCountOutputType
   */

  export type TestCountOutputType = {
    testCases: number
    files: number
    submissions: number
    submissionEvents: number
  }

  export type TestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testCases?: boolean | TestCountOutputTypeCountTestCasesArgs
    files?: boolean | TestCountOutputTypeCountFilesArgs
    submissions?: boolean | TestCountOutputTypeCountSubmissionsArgs
    submissionEvents?: boolean | TestCountOutputTypeCountSubmissionEventsArgs
  }

  // Custom InputTypes
  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCountOutputType
     */
    select?: TestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountTestCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestCaseWhereInput
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestFileWhereInput
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountSubmissionEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: $Enums.UserRole | null
    companyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: $Enums.UserRole | null
    companyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    companyId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    role: $Enums.UserRole
    companyId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
    jobDescriptions?: boolean | User$jobDescriptionsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "role" | "companyId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
    jobDescriptions?: boolean | User$jobDescriptionsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs> | null
      jobDescriptions: Prisma.$JobDescriptionPayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      role: $Enums.UserRole
      companyId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends User$companyArgs<ExtArgs> = {}>(args?: Subset<T, User$companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    jobDescriptions<T extends User$jobDescriptionsArgs<ExtArgs> = {}>(args?: Subset<T, User$jobDescriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends User$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly companyId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.company
   */
  export type User$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * User.jobDescriptions
   */
  export type User$jobDescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
    where?: JobDescriptionWhereInput
    orderBy?: JobDescriptionOrderByWithRelationInput | JobDescriptionOrderByWithRelationInput[]
    cursor?: JobDescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobDescriptionScalarFieldEnum | JobDescriptionScalarFieldEnum[]
  }

  /**
   * User.submissions
   */
  export type User$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    name: string
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    users?: boolean | Company$usersArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Company$usersArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Company$usersArgs<ExtArgs> = {}>(args?: Subset<T, Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.users
   */
  export type Company$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model JobDescription
   */

  export type AggregateJobDescription = {
    _count: JobDescriptionCountAggregateOutputType | null
    _avg: JobDescriptionAvgAggregateOutputType | null
    _sum: JobDescriptionSumAggregateOutputType | null
    _min: JobDescriptionMinAggregateOutputType | null
    _max: JobDescriptionMaxAggregateOutputType | null
  }

  export type JobDescriptionAvgAggregateOutputType = {
    minExperience: number | null
    maxExperience: number | null
  }

  export type JobDescriptionSumAggregateOutputType = {
    minExperience: number | null
    maxExperience: number | null
  }

  export type JobDescriptionMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    minExperience: number | null
    maxExperience: number | null
    projectContext: string | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: string | null
  }

  export type JobDescriptionMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    minExperience: number | null
    maxExperience: number | null
    projectContext: string | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: string | null
  }

  export type JobDescriptionCountAggregateOutputType = {
    id: number
    title: number
    description: number
    minExperience: number
    maxExperience: number
    languages: number
    projectContext: number
    createdAt: number
    updatedAt: number
    creatorId: number
    _all: number
  }


  export type JobDescriptionAvgAggregateInputType = {
    minExperience?: true
    maxExperience?: true
  }

  export type JobDescriptionSumAggregateInputType = {
    minExperience?: true
    maxExperience?: true
  }

  export type JobDescriptionMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    minExperience?: true
    maxExperience?: true
    projectContext?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type JobDescriptionMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    minExperience?: true
    maxExperience?: true
    projectContext?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type JobDescriptionCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    minExperience?: true
    maxExperience?: true
    languages?: true
    projectContext?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
    _all?: true
  }

  export type JobDescriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobDescription to aggregate.
     */
    where?: JobDescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobDescriptions to fetch.
     */
    orderBy?: JobDescriptionOrderByWithRelationInput | JobDescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobDescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobDescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobDescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobDescriptions
    **/
    _count?: true | JobDescriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobDescriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobDescriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobDescriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobDescriptionMaxAggregateInputType
  }

  export type GetJobDescriptionAggregateType<T extends JobDescriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateJobDescription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobDescription[P]>
      : GetScalarType<T[P], AggregateJobDescription[P]>
  }




  export type JobDescriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobDescriptionWhereInput
    orderBy?: JobDescriptionOrderByWithAggregationInput | JobDescriptionOrderByWithAggregationInput[]
    by: JobDescriptionScalarFieldEnum[] | JobDescriptionScalarFieldEnum
    having?: JobDescriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobDescriptionCountAggregateInputType | true
    _avg?: JobDescriptionAvgAggregateInputType
    _sum?: JobDescriptionSumAggregateInputType
    _min?: JobDescriptionMinAggregateInputType
    _max?: JobDescriptionMaxAggregateInputType
  }

  export type JobDescriptionGroupByOutputType = {
    id: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages: string[]
    projectContext: string
    createdAt: Date
    updatedAt: Date
    creatorId: string
    _count: JobDescriptionCountAggregateOutputType | null
    _avg: JobDescriptionAvgAggregateOutputType | null
    _sum: JobDescriptionSumAggregateOutputType | null
    _min: JobDescriptionMinAggregateOutputType | null
    _max: JobDescriptionMaxAggregateOutputType | null
  }

  type GetJobDescriptionGroupByPayload<T extends JobDescriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobDescriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobDescriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobDescriptionGroupByOutputType[P]>
            : GetScalarType<T[P], JobDescriptionGroupByOutputType[P]>
        }
      >
    >


  export type JobDescriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    minExperience?: boolean
    maxExperience?: boolean
    languages?: boolean
    projectContext?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    test?: boolean | JobDescription$testArgs<ExtArgs>
    candidates?: boolean | JobDescription$candidatesArgs<ExtArgs>
    _count?: boolean | JobDescriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobDescription"]>

  export type JobDescriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    minExperience?: boolean
    maxExperience?: boolean
    languages?: boolean
    projectContext?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobDescription"]>

  export type JobDescriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    minExperience?: boolean
    maxExperience?: boolean
    languages?: boolean
    projectContext?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobDescription"]>

  export type JobDescriptionSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    minExperience?: boolean
    maxExperience?: boolean
    languages?: boolean
    projectContext?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
  }

  export type JobDescriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "minExperience" | "maxExperience" | "languages" | "projectContext" | "createdAt" | "updatedAt" | "creatorId", ExtArgs["result"]["jobDescription"]>
  export type JobDescriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    test?: boolean | JobDescription$testArgs<ExtArgs>
    candidates?: boolean | JobDescription$candidatesArgs<ExtArgs>
    _count?: boolean | JobDescriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobDescriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JobDescriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $JobDescriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobDescription"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      test: Prisma.$TestPayload<ExtArgs> | null
      candidates: Prisma.$CandidatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      minExperience: number
      maxExperience: number
      languages: string[]
      projectContext: string
      createdAt: Date
      updatedAt: Date
      creatorId: string
    }, ExtArgs["result"]["jobDescription"]>
    composites: {}
  }

  type JobDescriptionGetPayload<S extends boolean | null | undefined | JobDescriptionDefaultArgs> = $Result.GetResult<Prisma.$JobDescriptionPayload, S>

  type JobDescriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobDescriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobDescriptionCountAggregateInputType | true
    }

  export interface JobDescriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobDescription'], meta: { name: 'JobDescription' } }
    /**
     * Find zero or one JobDescription that matches the filter.
     * @param {JobDescriptionFindUniqueArgs} args - Arguments to find a JobDescription
     * @example
     * // Get one JobDescription
     * const jobDescription = await prisma.jobDescription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobDescriptionFindUniqueArgs>(args: SelectSubset<T, JobDescriptionFindUniqueArgs<ExtArgs>>): Prisma__JobDescriptionClient<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobDescription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobDescriptionFindUniqueOrThrowArgs} args - Arguments to find a JobDescription
     * @example
     * // Get one JobDescription
     * const jobDescription = await prisma.jobDescription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobDescriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, JobDescriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobDescriptionClient<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobDescription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobDescriptionFindFirstArgs} args - Arguments to find a JobDescription
     * @example
     * // Get one JobDescription
     * const jobDescription = await prisma.jobDescription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobDescriptionFindFirstArgs>(args?: SelectSubset<T, JobDescriptionFindFirstArgs<ExtArgs>>): Prisma__JobDescriptionClient<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobDescription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobDescriptionFindFirstOrThrowArgs} args - Arguments to find a JobDescription
     * @example
     * // Get one JobDescription
     * const jobDescription = await prisma.jobDescription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobDescriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, JobDescriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobDescriptionClient<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobDescriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobDescriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobDescriptions
     * const jobDescriptions = await prisma.jobDescription.findMany()
     * 
     * // Get first 10 JobDescriptions
     * const jobDescriptions = await prisma.jobDescription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobDescriptionWithIdOnly = await prisma.jobDescription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobDescriptionFindManyArgs>(args?: SelectSubset<T, JobDescriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobDescription.
     * @param {JobDescriptionCreateArgs} args - Arguments to create a JobDescription.
     * @example
     * // Create one JobDescription
     * const JobDescription = await prisma.jobDescription.create({
     *   data: {
     *     // ... data to create a JobDescription
     *   }
     * })
     * 
     */
    create<T extends JobDescriptionCreateArgs>(args: SelectSubset<T, JobDescriptionCreateArgs<ExtArgs>>): Prisma__JobDescriptionClient<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobDescriptions.
     * @param {JobDescriptionCreateManyArgs} args - Arguments to create many JobDescriptions.
     * @example
     * // Create many JobDescriptions
     * const jobDescription = await prisma.jobDescription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobDescriptionCreateManyArgs>(args?: SelectSubset<T, JobDescriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobDescriptions and returns the data saved in the database.
     * @param {JobDescriptionCreateManyAndReturnArgs} args - Arguments to create many JobDescriptions.
     * @example
     * // Create many JobDescriptions
     * const jobDescription = await prisma.jobDescription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobDescriptions and only return the `id`
     * const jobDescriptionWithIdOnly = await prisma.jobDescription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobDescriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, JobDescriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobDescription.
     * @param {JobDescriptionDeleteArgs} args - Arguments to delete one JobDescription.
     * @example
     * // Delete one JobDescription
     * const JobDescription = await prisma.jobDescription.delete({
     *   where: {
     *     // ... filter to delete one JobDescription
     *   }
     * })
     * 
     */
    delete<T extends JobDescriptionDeleteArgs>(args: SelectSubset<T, JobDescriptionDeleteArgs<ExtArgs>>): Prisma__JobDescriptionClient<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobDescription.
     * @param {JobDescriptionUpdateArgs} args - Arguments to update one JobDescription.
     * @example
     * // Update one JobDescription
     * const jobDescription = await prisma.jobDescription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobDescriptionUpdateArgs>(args: SelectSubset<T, JobDescriptionUpdateArgs<ExtArgs>>): Prisma__JobDescriptionClient<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobDescriptions.
     * @param {JobDescriptionDeleteManyArgs} args - Arguments to filter JobDescriptions to delete.
     * @example
     * // Delete a few JobDescriptions
     * const { count } = await prisma.jobDescription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDescriptionDeleteManyArgs>(args?: SelectSubset<T, JobDescriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobDescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobDescriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobDescriptions
     * const jobDescription = await prisma.jobDescription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobDescriptionUpdateManyArgs>(args: SelectSubset<T, JobDescriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobDescriptions and returns the data updated in the database.
     * @param {JobDescriptionUpdateManyAndReturnArgs} args - Arguments to update many JobDescriptions.
     * @example
     * // Update many JobDescriptions
     * const jobDescription = await prisma.jobDescription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobDescriptions and only return the `id`
     * const jobDescriptionWithIdOnly = await prisma.jobDescription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobDescriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, JobDescriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobDescription.
     * @param {JobDescriptionUpsertArgs} args - Arguments to update or create a JobDescription.
     * @example
     * // Update or create a JobDescription
     * const jobDescription = await prisma.jobDescription.upsert({
     *   create: {
     *     // ... data to create a JobDescription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobDescription we want to update
     *   }
     * })
     */
    upsert<T extends JobDescriptionUpsertArgs>(args: SelectSubset<T, JobDescriptionUpsertArgs<ExtArgs>>): Prisma__JobDescriptionClient<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobDescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobDescriptionCountArgs} args - Arguments to filter JobDescriptions to count.
     * @example
     * // Count the number of JobDescriptions
     * const count = await prisma.jobDescription.count({
     *   where: {
     *     // ... the filter for the JobDescriptions we want to count
     *   }
     * })
    **/
    count<T extends JobDescriptionCountArgs>(
      args?: Subset<T, JobDescriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobDescriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobDescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobDescriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobDescriptionAggregateArgs>(args: Subset<T, JobDescriptionAggregateArgs>): Prisma.PrismaPromise<GetJobDescriptionAggregateType<T>>

    /**
     * Group by JobDescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobDescriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobDescriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobDescriptionGroupByArgs['orderBy'] }
        : { orderBy?: JobDescriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobDescriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobDescriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobDescription model
   */
  readonly fields: JobDescriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobDescription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobDescriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    test<T extends JobDescription$testArgs<ExtArgs> = {}>(args?: Subset<T, JobDescription$testArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    candidates<T extends JobDescription$candidatesArgs<ExtArgs> = {}>(args?: Subset<T, JobDescription$candidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobDescription model
   */
  interface JobDescriptionFieldRefs {
    readonly id: FieldRef<"JobDescription", 'String'>
    readonly title: FieldRef<"JobDescription", 'String'>
    readonly description: FieldRef<"JobDescription", 'String'>
    readonly minExperience: FieldRef<"JobDescription", 'Int'>
    readonly maxExperience: FieldRef<"JobDescription", 'Int'>
    readonly languages: FieldRef<"JobDescription", 'String[]'>
    readonly projectContext: FieldRef<"JobDescription", 'String'>
    readonly createdAt: FieldRef<"JobDescription", 'DateTime'>
    readonly updatedAt: FieldRef<"JobDescription", 'DateTime'>
    readonly creatorId: FieldRef<"JobDescription", 'String'>
  }
    

  // Custom InputTypes
  /**
   * JobDescription findUnique
   */
  export type JobDescriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
    /**
     * Filter, which JobDescription to fetch.
     */
    where: JobDescriptionWhereUniqueInput
  }

  /**
   * JobDescription findUniqueOrThrow
   */
  export type JobDescriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
    /**
     * Filter, which JobDescription to fetch.
     */
    where: JobDescriptionWhereUniqueInput
  }

  /**
   * JobDescription findFirst
   */
  export type JobDescriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
    /**
     * Filter, which JobDescription to fetch.
     */
    where?: JobDescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobDescriptions to fetch.
     */
    orderBy?: JobDescriptionOrderByWithRelationInput | JobDescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobDescriptions.
     */
    cursor?: JobDescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobDescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobDescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobDescriptions.
     */
    distinct?: JobDescriptionScalarFieldEnum | JobDescriptionScalarFieldEnum[]
  }

  /**
   * JobDescription findFirstOrThrow
   */
  export type JobDescriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
    /**
     * Filter, which JobDescription to fetch.
     */
    where?: JobDescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobDescriptions to fetch.
     */
    orderBy?: JobDescriptionOrderByWithRelationInput | JobDescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobDescriptions.
     */
    cursor?: JobDescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobDescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobDescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobDescriptions.
     */
    distinct?: JobDescriptionScalarFieldEnum | JobDescriptionScalarFieldEnum[]
  }

  /**
   * JobDescription findMany
   */
  export type JobDescriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
    /**
     * Filter, which JobDescriptions to fetch.
     */
    where?: JobDescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobDescriptions to fetch.
     */
    orderBy?: JobDescriptionOrderByWithRelationInput | JobDescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobDescriptions.
     */
    cursor?: JobDescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobDescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobDescriptions.
     */
    skip?: number
    distinct?: JobDescriptionScalarFieldEnum | JobDescriptionScalarFieldEnum[]
  }

  /**
   * JobDescription create
   */
  export type JobDescriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a JobDescription.
     */
    data: XOR<JobDescriptionCreateInput, JobDescriptionUncheckedCreateInput>
  }

  /**
   * JobDescription createMany
   */
  export type JobDescriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobDescriptions.
     */
    data: JobDescriptionCreateManyInput | JobDescriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobDescription createManyAndReturn
   */
  export type JobDescriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * The data used to create many JobDescriptions.
     */
    data: JobDescriptionCreateManyInput | JobDescriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobDescription update
   */
  export type JobDescriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a JobDescription.
     */
    data: XOR<JobDescriptionUpdateInput, JobDescriptionUncheckedUpdateInput>
    /**
     * Choose, which JobDescription to update.
     */
    where: JobDescriptionWhereUniqueInput
  }

  /**
   * JobDescription updateMany
   */
  export type JobDescriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobDescriptions.
     */
    data: XOR<JobDescriptionUpdateManyMutationInput, JobDescriptionUncheckedUpdateManyInput>
    /**
     * Filter which JobDescriptions to update
     */
    where?: JobDescriptionWhereInput
    /**
     * Limit how many JobDescriptions to update.
     */
    limit?: number
  }

  /**
   * JobDescription updateManyAndReturn
   */
  export type JobDescriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * The data used to update JobDescriptions.
     */
    data: XOR<JobDescriptionUpdateManyMutationInput, JobDescriptionUncheckedUpdateManyInput>
    /**
     * Filter which JobDescriptions to update
     */
    where?: JobDescriptionWhereInput
    /**
     * Limit how many JobDescriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobDescription upsert
   */
  export type JobDescriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the JobDescription to update in case it exists.
     */
    where: JobDescriptionWhereUniqueInput
    /**
     * In case the JobDescription found by the `where` argument doesn't exist, create a new JobDescription with this data.
     */
    create: XOR<JobDescriptionCreateInput, JobDescriptionUncheckedCreateInput>
    /**
     * In case the JobDescription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobDescriptionUpdateInput, JobDescriptionUncheckedUpdateInput>
  }

  /**
   * JobDescription delete
   */
  export type JobDescriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
    /**
     * Filter which JobDescription to delete.
     */
    where: JobDescriptionWhereUniqueInput
  }

  /**
   * JobDescription deleteMany
   */
  export type JobDescriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobDescriptions to delete
     */
    where?: JobDescriptionWhereInput
    /**
     * Limit how many JobDescriptions to delete.
     */
    limit?: number
  }

  /**
   * JobDescription.test
   */
  export type JobDescription$testArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    where?: TestWhereInput
  }

  /**
   * JobDescription.candidates
   */
  export type JobDescription$candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    where?: CandidateWhereInput
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    cursor?: CandidateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * JobDescription without action
   */
  export type JobDescriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobDescription
     */
    select?: JobDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobDescription
     */
    omit?: JobDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobDescriptionInclude<ExtArgs> | null
  }


  /**
   * Model Candidate
   */

  export type AggregateCandidate = {
    _count: CandidateCountAggregateOutputType | null
    _avg: CandidateAvgAggregateOutputType | null
    _sum: CandidateSumAggregateOutputType | null
    _min: CandidateMinAggregateOutputType | null
    _max: CandidateMaxAggregateOutputType | null
  }

  export type CandidateAvgAggregateOutputType = {
    suitabilityScore: number | null
  }

  export type CandidateSumAggregateOutputType = {
    suitabilityScore: number | null
  }

  export type CandidateMinAggregateOutputType = {
    id: string | null
    status: string | null
    suitabilityScore: number | null
    individualRepoUrl: string | null
    repoCreatedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    jobDescriptionId: string | null
    resumeId: string | null
  }

  export type CandidateMaxAggregateOutputType = {
    id: string | null
    status: string | null
    suitabilityScore: number | null
    individualRepoUrl: string | null
    repoCreatedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    jobDescriptionId: string | null
    resumeId: string | null
  }

  export type CandidateCountAggregateOutputType = {
    id: number
    status: number
    suitabilityScore: number
    suitabilityAnalysis: number
    individualRepoUrl: number
    repoCreatedAt: number
    createdAt: number
    updatedAt: number
    jobDescriptionId: number
    resumeId: number
    _all: number
  }


  export type CandidateAvgAggregateInputType = {
    suitabilityScore?: true
  }

  export type CandidateSumAggregateInputType = {
    suitabilityScore?: true
  }

  export type CandidateMinAggregateInputType = {
    id?: true
    status?: true
    suitabilityScore?: true
    individualRepoUrl?: true
    repoCreatedAt?: true
    createdAt?: true
    updatedAt?: true
    jobDescriptionId?: true
    resumeId?: true
  }

  export type CandidateMaxAggregateInputType = {
    id?: true
    status?: true
    suitabilityScore?: true
    individualRepoUrl?: true
    repoCreatedAt?: true
    createdAt?: true
    updatedAt?: true
    jobDescriptionId?: true
    resumeId?: true
  }

  export type CandidateCountAggregateInputType = {
    id?: true
    status?: true
    suitabilityScore?: true
    suitabilityAnalysis?: true
    individualRepoUrl?: true
    repoCreatedAt?: true
    createdAt?: true
    updatedAt?: true
    jobDescriptionId?: true
    resumeId?: true
    _all?: true
  }

  export type CandidateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidate to aggregate.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Candidates
    **/
    _count?: true | CandidateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CandidateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CandidateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandidateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandidateMaxAggregateInputType
  }

  export type GetCandidateAggregateType<T extends CandidateAggregateArgs> = {
        [P in keyof T & keyof AggregateCandidate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandidate[P]>
      : GetScalarType<T[P], AggregateCandidate[P]>
  }




  export type CandidateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateWhereInput
    orderBy?: CandidateOrderByWithAggregationInput | CandidateOrderByWithAggregationInput[]
    by: CandidateScalarFieldEnum[] | CandidateScalarFieldEnum
    having?: CandidateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandidateCountAggregateInputType | true
    _avg?: CandidateAvgAggregateInputType
    _sum?: CandidateSumAggregateInputType
    _min?: CandidateMinAggregateInputType
    _max?: CandidateMaxAggregateInputType
  }

  export type CandidateGroupByOutputType = {
    id: string
    status: string
    suitabilityScore: number | null
    suitabilityAnalysis: JsonValue | null
    individualRepoUrl: string | null
    repoCreatedAt: Date | null
    createdAt: Date
    updatedAt: Date
    jobDescriptionId: string
    resumeId: string
    _count: CandidateCountAggregateOutputType | null
    _avg: CandidateAvgAggregateOutputType | null
    _sum: CandidateSumAggregateOutputType | null
    _min: CandidateMinAggregateOutputType | null
    _max: CandidateMaxAggregateOutputType | null
  }

  type GetCandidateGroupByPayload<T extends CandidateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandidateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandidateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandidateGroupByOutputType[P]>
            : GetScalarType<T[P], CandidateGroupByOutputType[P]>
        }
      >
    >


  export type CandidateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    suitabilityScore?: boolean
    suitabilityAnalysis?: boolean
    individualRepoUrl?: boolean
    repoCreatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jobDescriptionId?: boolean
    resumeId?: boolean
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
    submissionEvents?: boolean | Candidate$submissionEventsArgs<ExtArgs>
    _count?: boolean | CandidateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    suitabilityScore?: boolean
    suitabilityAnalysis?: boolean
    individualRepoUrl?: boolean
    repoCreatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jobDescriptionId?: boolean
    resumeId?: boolean
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    suitabilityScore?: boolean
    suitabilityAnalysis?: boolean
    individualRepoUrl?: boolean
    repoCreatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jobDescriptionId?: boolean
    resumeId?: boolean
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectScalar = {
    id?: boolean
    status?: boolean
    suitabilityScore?: boolean
    suitabilityAnalysis?: boolean
    individualRepoUrl?: boolean
    repoCreatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jobDescriptionId?: boolean
    resumeId?: boolean
  }

  export type CandidateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "suitabilityScore" | "suitabilityAnalysis" | "individualRepoUrl" | "repoCreatedAt" | "createdAt" | "updatedAt" | "jobDescriptionId" | "resumeId", ExtArgs["result"]["candidate"]>
  export type CandidateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
    submissionEvents?: boolean | Candidate$submissionEventsArgs<ExtArgs>
    _count?: boolean | CandidateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CandidateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }
  export type CandidateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }

  export type $CandidatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Candidate"
    objects: {
      jobDescription: Prisma.$JobDescriptionPayload<ExtArgs>
      resume: Prisma.$ResumePayload<ExtArgs>
      submissionEvents: Prisma.$SubmissionEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: string
      suitabilityScore: number | null
      suitabilityAnalysis: Prisma.JsonValue | null
      individualRepoUrl: string | null
      repoCreatedAt: Date | null
      createdAt: Date
      updatedAt: Date
      jobDescriptionId: string
      resumeId: string
    }, ExtArgs["result"]["candidate"]>
    composites: {}
  }

  type CandidateGetPayload<S extends boolean | null | undefined | CandidateDefaultArgs> = $Result.GetResult<Prisma.$CandidatePayload, S>

  type CandidateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CandidateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandidateCountAggregateInputType | true
    }

  export interface CandidateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Candidate'], meta: { name: 'Candidate' } }
    /**
     * Find zero or one Candidate that matches the filter.
     * @param {CandidateFindUniqueArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandidateFindUniqueArgs>(args: SelectSubset<T, CandidateFindUniqueArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Candidate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CandidateFindUniqueOrThrowArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandidateFindUniqueOrThrowArgs>(args: SelectSubset<T, CandidateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindFirstArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandidateFindFirstArgs>(args?: SelectSubset<T, CandidateFindFirstArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindFirstOrThrowArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandidateFindFirstOrThrowArgs>(args?: SelectSubset<T, CandidateFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Candidates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Candidates
     * const candidates = await prisma.candidate.findMany()
     * 
     * // Get first 10 Candidates
     * const candidates = await prisma.candidate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candidateWithIdOnly = await prisma.candidate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandidateFindManyArgs>(args?: SelectSubset<T, CandidateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Candidate.
     * @param {CandidateCreateArgs} args - Arguments to create a Candidate.
     * @example
     * // Create one Candidate
     * const Candidate = await prisma.candidate.create({
     *   data: {
     *     // ... data to create a Candidate
     *   }
     * })
     * 
     */
    create<T extends CandidateCreateArgs>(args: SelectSubset<T, CandidateCreateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Candidates.
     * @param {CandidateCreateManyArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidate = await prisma.candidate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandidateCreateManyArgs>(args?: SelectSubset<T, CandidateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Candidates and returns the data saved in the database.
     * @param {CandidateCreateManyAndReturnArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidate = await prisma.candidate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Candidates and only return the `id`
     * const candidateWithIdOnly = await prisma.candidate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CandidateCreateManyAndReturnArgs>(args?: SelectSubset<T, CandidateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Candidate.
     * @param {CandidateDeleteArgs} args - Arguments to delete one Candidate.
     * @example
     * // Delete one Candidate
     * const Candidate = await prisma.candidate.delete({
     *   where: {
     *     // ... filter to delete one Candidate
     *   }
     * })
     * 
     */
    delete<T extends CandidateDeleteArgs>(args: SelectSubset<T, CandidateDeleteArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Candidate.
     * @param {CandidateUpdateArgs} args - Arguments to update one Candidate.
     * @example
     * // Update one Candidate
     * const candidate = await prisma.candidate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandidateUpdateArgs>(args: SelectSubset<T, CandidateUpdateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Candidates.
     * @param {CandidateDeleteManyArgs} args - Arguments to filter Candidates to delete.
     * @example
     * // Delete a few Candidates
     * const { count } = await prisma.candidate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandidateDeleteManyArgs>(args?: SelectSubset<T, CandidateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Candidates
     * const candidate = await prisma.candidate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandidateUpdateManyArgs>(args: SelectSubset<T, CandidateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates and returns the data updated in the database.
     * @param {CandidateUpdateManyAndReturnArgs} args - Arguments to update many Candidates.
     * @example
     * // Update many Candidates
     * const candidate = await prisma.candidate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Candidates and only return the `id`
     * const candidateWithIdOnly = await prisma.candidate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CandidateUpdateManyAndReturnArgs>(args: SelectSubset<T, CandidateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Candidate.
     * @param {CandidateUpsertArgs} args - Arguments to update or create a Candidate.
     * @example
     * // Update or create a Candidate
     * const candidate = await prisma.candidate.upsert({
     *   create: {
     *     // ... data to create a Candidate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Candidate we want to update
     *   }
     * })
     */
    upsert<T extends CandidateUpsertArgs>(args: SelectSubset<T, CandidateUpsertArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCountArgs} args - Arguments to filter Candidates to count.
     * @example
     * // Count the number of Candidates
     * const count = await prisma.candidate.count({
     *   where: {
     *     // ... the filter for the Candidates we want to count
     *   }
     * })
    **/
    count<T extends CandidateCountArgs>(
      args?: Subset<T, CandidateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandidateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Candidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CandidateAggregateArgs>(args: Subset<T, CandidateAggregateArgs>): Prisma.PrismaPromise<GetCandidateAggregateType<T>>

    /**
     * Group by Candidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CandidateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandidateGroupByArgs['orderBy'] }
        : { orderBy?: CandidateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CandidateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandidateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Candidate model
   */
  readonly fields: CandidateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Candidate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandidateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobDescription<T extends JobDescriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDescriptionDefaultArgs<ExtArgs>>): Prisma__JobDescriptionClient<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    resume<T extends ResumeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResumeDefaultArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    submissionEvents<T extends Candidate$submissionEventsArgs<ExtArgs> = {}>(args?: Subset<T, Candidate$submissionEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Candidate model
   */
  interface CandidateFieldRefs {
    readonly id: FieldRef<"Candidate", 'String'>
    readonly status: FieldRef<"Candidate", 'String'>
    readonly suitabilityScore: FieldRef<"Candidate", 'Float'>
    readonly suitabilityAnalysis: FieldRef<"Candidate", 'Json'>
    readonly individualRepoUrl: FieldRef<"Candidate", 'String'>
    readonly repoCreatedAt: FieldRef<"Candidate", 'DateTime'>
    readonly createdAt: FieldRef<"Candidate", 'DateTime'>
    readonly updatedAt: FieldRef<"Candidate", 'DateTime'>
    readonly jobDescriptionId: FieldRef<"Candidate", 'String'>
    readonly resumeId: FieldRef<"Candidate", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Candidate findUnique
   */
  export type CandidateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate findUniqueOrThrow
   */
  export type CandidateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate findFirst
   */
  export type CandidateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidates.
     */
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate findFirstOrThrow
   */
  export type CandidateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidates.
     */
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate findMany
   */
  export type CandidateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidates to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate create
   */
  export type CandidateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The data needed to create a Candidate.
     */
    data: XOR<CandidateCreateInput, CandidateUncheckedCreateInput>
  }

  /**
   * Candidate createMany
   */
  export type CandidateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Candidates.
     */
    data: CandidateCreateManyInput | CandidateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Candidate createManyAndReturn
   */
  export type CandidateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * The data used to create many Candidates.
     */
    data: CandidateCreateManyInput | CandidateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Candidate update
   */
  export type CandidateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The data needed to update a Candidate.
     */
    data: XOR<CandidateUpdateInput, CandidateUncheckedUpdateInput>
    /**
     * Choose, which Candidate to update.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate updateMany
   */
  export type CandidateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Candidates.
     */
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyInput>
    /**
     * Filter which Candidates to update
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to update.
     */
    limit?: number
  }

  /**
   * Candidate updateManyAndReturn
   */
  export type CandidateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * The data used to update Candidates.
     */
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyInput>
    /**
     * Filter which Candidates to update
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Candidate upsert
   */
  export type CandidateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The filter to search for the Candidate to update in case it exists.
     */
    where: CandidateWhereUniqueInput
    /**
     * In case the Candidate found by the `where` argument doesn't exist, create a new Candidate with this data.
     */
    create: XOR<CandidateCreateInput, CandidateUncheckedCreateInput>
    /**
     * In case the Candidate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandidateUpdateInput, CandidateUncheckedUpdateInput>
  }

  /**
   * Candidate delete
   */
  export type CandidateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter which Candidate to delete.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate deleteMany
   */
  export type CandidateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidates to delete
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to delete.
     */
    limit?: number
  }

  /**
   * Candidate.submissionEvents
   */
  export type Candidate$submissionEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    where?: SubmissionEventWhereInput
    orderBy?: SubmissionEventOrderByWithRelationInput | SubmissionEventOrderByWithRelationInput[]
    cursor?: SubmissionEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionEventScalarFieldEnum | SubmissionEventScalarFieldEnum[]
  }

  /**
   * Candidate without action
   */
  export type CandidateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
  }


  /**
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeAvgAggregateOutputType = {
    size: number | null
  }

  export type ResumeSumAggregateOutputType = {
    size: number | null
  }

  export type ResumeMinAggregateOutputType = {
    id: string | null
    email: string | null
    filename: string | null
    path: string | null
    size: number | null
    uploadedAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: string | null
    email: string | null
    filename: string | null
    path: string | null
    size: number | null
    uploadedAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    email: number
    filename: number
    path: number
    size: number
    analysis: number
    uploadedAt: number
    updatedAt: number
    _all: number
  }


  export type ResumeAvgAggregateInputType = {
    size?: true
  }

  export type ResumeSumAggregateInputType = {
    size?: true
  }

  export type ResumeMinAggregateInputType = {
    id?: true
    email?: true
    filename?: true
    path?: true
    size?: true
    uploadedAt?: true
    updatedAt?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    email?: true
    filename?: true
    path?: true
    size?: true
    uploadedAt?: true
    updatedAt?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    email?: true
    filename?: true
    path?: true
    size?: true
    analysis?: true
    uploadedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _avg?: ResumeAvgAggregateInputType
    _sum?: ResumeSumAggregateInputType
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: string
    email: string
    filename: string
    path: string
    size: number
    analysis: JsonValue | null
    uploadedAt: Date
    updatedAt: Date
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    filename?: boolean
    path?: boolean
    size?: boolean
    analysis?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
    candidates?: boolean | Resume$candidatesArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    filename?: boolean
    path?: boolean
    size?: boolean
    analysis?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    filename?: boolean
    path?: boolean
    size?: boolean
    analysis?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectScalar = {
    id?: boolean
    email?: boolean
    filename?: boolean
    path?: boolean
    size?: boolean
    analysis?: boolean
    uploadedAt?: boolean
    updatedAt?: boolean
  }

  export type ResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "filename" | "path" | "size" | "analysis" | "uploadedAt" | "updatedAt", ExtArgs["result"]["resume"]>
  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | Resume$candidatesArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ResumeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      candidates: Prisma.$CandidatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      filename: string
      path: string
      size: number
      analysis: Prisma.JsonValue | null
      uploadedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resumes and returns the data saved in the database.
     * @param {ResumeCreateManyAndReturnArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes and returns the data updated in the database.
     * @param {ResumeUpdateManyAndReturnArgs} args - Arguments to update many Resumes.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidates<T extends Resume$candidatesArgs<ExtArgs> = {}>(args?: Subset<T, Resume$candidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resume model
   */
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'String'>
    readonly email: FieldRef<"Resume", 'String'>
    readonly filename: FieldRef<"Resume", 'String'>
    readonly path: FieldRef<"Resume", 'String'>
    readonly size: FieldRef<"Resume", 'Int'>
    readonly analysis: FieldRef<"Resume", 'Json'>
    readonly uploadedAt: FieldRef<"Resume", 'DateTime'>
    readonly updatedAt: FieldRef<"Resume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resume createManyAndReturn
   */
  export type ResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume updateManyAndReturn
   */
  export type ResumeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to delete.
     */
    limit?: number
  }

  /**
   * Resume.candidates
   */
  export type Resume$candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    where?: CandidateWhereInput
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    cursor?: CandidateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Model Test
   */

  export type AggregateTest = {
    _count: TestCountAggregateOutputType | null
    _min: TestMinAggregateOutputType | null
    _max: TestMaxAggregateOutputType | null
  }

  export type TestMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    difficulty: string | null
    gitRepoUrl: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
    jobDescriptionId: string | null
    repoArchived: boolean | null
    repoArchivedAt: Date | null
  }

  export type TestMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    difficulty: string | null
    gitRepoUrl: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
    jobDescriptionId: string | null
    repoArchived: boolean | null
    repoArchivedAt: Date | null
  }

  export type TestCountAggregateOutputType = {
    id: number
    title: number
    description: number
    difficulty: number
    gitRepoUrl: number
    language: number
    requirements: number
    createdAt: number
    updatedAt: number
    jobDescriptionId: number
    repoArchived: number
    repoArchivedAt: number
    _all: number
  }


  export type TestMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    difficulty?: true
    gitRepoUrl?: true
    language?: true
    createdAt?: true
    updatedAt?: true
    jobDescriptionId?: true
    repoArchived?: true
    repoArchivedAt?: true
  }

  export type TestMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    difficulty?: true
    gitRepoUrl?: true
    language?: true
    createdAt?: true
    updatedAt?: true
    jobDescriptionId?: true
    repoArchived?: true
    repoArchivedAt?: true
  }

  export type TestCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    difficulty?: true
    gitRepoUrl?: true
    language?: true
    requirements?: true
    createdAt?: true
    updatedAt?: true
    jobDescriptionId?: true
    repoArchived?: true
    repoArchivedAt?: true
    _all?: true
  }

  export type TestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Test to aggregate.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tests
    **/
    _count?: true | TestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestMaxAggregateInputType
  }

  export type GetTestAggregateType<T extends TestAggregateArgs> = {
        [P in keyof T & keyof AggregateTest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTest[P]>
      : GetScalarType<T[P], AggregateTest[P]>
  }




  export type TestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestWhereInput
    orderBy?: TestOrderByWithAggregationInput | TestOrderByWithAggregationInput[]
    by: TestScalarFieldEnum[] | TestScalarFieldEnum
    having?: TestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestCountAggregateInputType | true
    _min?: TestMinAggregateInputType
    _max?: TestMaxAggregateInputType
  }

  export type TestGroupByOutputType = {
    id: string
    title: string
    description: string | null
    difficulty: string
    gitRepoUrl: string | null
    language: string
    requirements: JsonValue
    createdAt: Date
    updatedAt: Date
    jobDescriptionId: string
    repoArchived: boolean
    repoArchivedAt: Date | null
    _count: TestCountAggregateOutputType | null
    _min: TestMinAggregateOutputType | null
    _max: TestMaxAggregateOutputType | null
  }

  type GetTestGroupByPayload<T extends TestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestGroupByOutputType[P]>
            : GetScalarType<T[P], TestGroupByOutputType[P]>
        }
      >
    >


  export type TestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    gitRepoUrl?: boolean
    language?: boolean
    requirements?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jobDescriptionId?: boolean
    repoArchived?: boolean
    repoArchivedAt?: boolean
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
    testCases?: boolean | Test$testCasesArgs<ExtArgs>
    files?: boolean | Test$filesArgs<ExtArgs>
    submissions?: boolean | Test$submissionsArgs<ExtArgs>
    submissionEvents?: boolean | Test$submissionEventsArgs<ExtArgs>
    _count?: boolean | TestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test"]>

  export type TestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    gitRepoUrl?: boolean
    language?: boolean
    requirements?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jobDescriptionId?: boolean
    repoArchived?: boolean
    repoArchivedAt?: boolean
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test"]>

  export type TestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    gitRepoUrl?: boolean
    language?: boolean
    requirements?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jobDescriptionId?: boolean
    repoArchived?: boolean
    repoArchivedAt?: boolean
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test"]>

  export type TestSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    gitRepoUrl?: boolean
    language?: boolean
    requirements?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jobDescriptionId?: boolean
    repoArchived?: boolean
    repoArchivedAt?: boolean
  }

  export type TestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "difficulty" | "gitRepoUrl" | "language" | "requirements" | "createdAt" | "updatedAt" | "jobDescriptionId" | "repoArchived" | "repoArchivedAt", ExtArgs["result"]["test"]>
  export type TestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
    testCases?: boolean | Test$testCasesArgs<ExtArgs>
    files?: boolean | Test$filesArgs<ExtArgs>
    submissions?: boolean | Test$submissionsArgs<ExtArgs>
    submissionEvents?: boolean | Test$submissionEventsArgs<ExtArgs>
    _count?: boolean | TestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
  }
  export type TestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobDescription?: boolean | JobDescriptionDefaultArgs<ExtArgs>
  }

  export type $TestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Test"
    objects: {
      jobDescription: Prisma.$JobDescriptionPayload<ExtArgs>
      testCases: Prisma.$TestCasePayload<ExtArgs>[]
      files: Prisma.$TestFilePayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
      submissionEvents: Prisma.$SubmissionEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      difficulty: string
      gitRepoUrl: string | null
      language: string
      requirements: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
      jobDescriptionId: string
      repoArchived: boolean
      repoArchivedAt: Date | null
    }, ExtArgs["result"]["test"]>
    composites: {}
  }

  type TestGetPayload<S extends boolean | null | undefined | TestDefaultArgs> = $Result.GetResult<Prisma.$TestPayload, S>

  type TestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestCountAggregateInputType | true
    }

  export interface TestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Test'], meta: { name: 'Test' } }
    /**
     * Find zero or one Test that matches the filter.
     * @param {TestFindUniqueArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestFindUniqueArgs>(args: SelectSubset<T, TestFindUniqueArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Test that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestFindUniqueOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestFindUniqueOrThrowArgs>(args: SelectSubset<T, TestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Test that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestFindFirstArgs>(args?: SelectSubset<T, TestFindFirstArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Test that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestFindFirstOrThrowArgs>(args?: SelectSubset<T, TestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tests
     * const tests = await prisma.test.findMany()
     * 
     * // Get first 10 Tests
     * const tests = await prisma.test.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testWithIdOnly = await prisma.test.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestFindManyArgs>(args?: SelectSubset<T, TestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Test.
     * @param {TestCreateArgs} args - Arguments to create a Test.
     * @example
     * // Create one Test
     * const Test = await prisma.test.create({
     *   data: {
     *     // ... data to create a Test
     *   }
     * })
     * 
     */
    create<T extends TestCreateArgs>(args: SelectSubset<T, TestCreateArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tests.
     * @param {TestCreateManyArgs} args - Arguments to create many Tests.
     * @example
     * // Create many Tests
     * const test = await prisma.test.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestCreateManyArgs>(args?: SelectSubset<T, TestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tests and returns the data saved in the database.
     * @param {TestCreateManyAndReturnArgs} args - Arguments to create many Tests.
     * @example
     * // Create many Tests
     * const test = await prisma.test.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tests and only return the `id`
     * const testWithIdOnly = await prisma.test.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestCreateManyAndReturnArgs>(args?: SelectSubset<T, TestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Test.
     * @param {TestDeleteArgs} args - Arguments to delete one Test.
     * @example
     * // Delete one Test
     * const Test = await prisma.test.delete({
     *   where: {
     *     // ... filter to delete one Test
     *   }
     * })
     * 
     */
    delete<T extends TestDeleteArgs>(args: SelectSubset<T, TestDeleteArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Test.
     * @param {TestUpdateArgs} args - Arguments to update one Test.
     * @example
     * // Update one Test
     * const test = await prisma.test.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestUpdateArgs>(args: SelectSubset<T, TestUpdateArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tests.
     * @param {TestDeleteManyArgs} args - Arguments to filter Tests to delete.
     * @example
     * // Delete a few Tests
     * const { count } = await prisma.test.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestDeleteManyArgs>(args?: SelectSubset<T, TestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestUpdateManyArgs>(args: SelectSubset<T, TestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tests and returns the data updated in the database.
     * @param {TestUpdateManyAndReturnArgs} args - Arguments to update many Tests.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tests and only return the `id`
     * const testWithIdOnly = await prisma.test.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestUpdateManyAndReturnArgs>(args: SelectSubset<T, TestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Test.
     * @param {TestUpsertArgs} args - Arguments to update or create a Test.
     * @example
     * // Update or create a Test
     * const test = await prisma.test.upsert({
     *   create: {
     *     // ... data to create a Test
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Test we want to update
     *   }
     * })
     */
    upsert<T extends TestUpsertArgs>(args: SelectSubset<T, TestUpsertArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCountArgs} args - Arguments to filter Tests to count.
     * @example
     * // Count the number of Tests
     * const count = await prisma.test.count({
     *   where: {
     *     // ... the filter for the Tests we want to count
     *   }
     * })
    **/
    count<T extends TestCountArgs>(
      args?: Subset<T, TestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestAggregateArgs>(args: Subset<T, TestAggregateArgs>): Prisma.PrismaPromise<GetTestAggregateType<T>>

    /**
     * Group by Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestGroupByArgs['orderBy'] }
        : { orderBy?: TestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Test model
   */
  readonly fields: TestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Test.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobDescription<T extends JobDescriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDescriptionDefaultArgs<ExtArgs>>): Prisma__JobDescriptionClient<$Result.GetResult<Prisma.$JobDescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    testCases<T extends Test$testCasesArgs<ExtArgs> = {}>(args?: Subset<T, Test$testCasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    files<T extends Test$filesArgs<ExtArgs> = {}>(args?: Subset<T, Test$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends Test$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Test$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissionEvents<T extends Test$submissionEventsArgs<ExtArgs> = {}>(args?: Subset<T, Test$submissionEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Test model
   */
  interface TestFieldRefs {
    readonly id: FieldRef<"Test", 'String'>
    readonly title: FieldRef<"Test", 'String'>
    readonly description: FieldRef<"Test", 'String'>
    readonly difficulty: FieldRef<"Test", 'String'>
    readonly gitRepoUrl: FieldRef<"Test", 'String'>
    readonly language: FieldRef<"Test", 'String'>
    readonly requirements: FieldRef<"Test", 'Json'>
    readonly createdAt: FieldRef<"Test", 'DateTime'>
    readonly updatedAt: FieldRef<"Test", 'DateTime'>
    readonly jobDescriptionId: FieldRef<"Test", 'String'>
    readonly repoArchived: FieldRef<"Test", 'Boolean'>
    readonly repoArchivedAt: FieldRef<"Test", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Test findUnique
   */
  export type TestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test findUniqueOrThrow
   */
  export type TestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test findFirst
   */
  export type TestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     */
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test findFirstOrThrow
   */
  export type TestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     */
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test findMany
   */
  export type TestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Tests to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test create
   */
  export type TestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The data needed to create a Test.
     */
    data: XOR<TestCreateInput, TestUncheckedCreateInput>
  }

  /**
   * Test createMany
   */
  export type TestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tests.
     */
    data: TestCreateManyInput | TestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Test createManyAndReturn
   */
  export type TestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * The data used to create many Tests.
     */
    data: TestCreateManyInput | TestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Test update
   */
  export type TestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The data needed to update a Test.
     */
    data: XOR<TestUpdateInput, TestUncheckedUpdateInput>
    /**
     * Choose, which Test to update.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test updateMany
   */
  export type TestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tests.
     */
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyInput>
    /**
     * Filter which Tests to update
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to update.
     */
    limit?: number
  }

  /**
   * Test updateManyAndReturn
   */
  export type TestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * The data used to update Tests.
     */
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyInput>
    /**
     * Filter which Tests to update
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Test upsert
   */
  export type TestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The filter to search for the Test to update in case it exists.
     */
    where: TestWhereUniqueInput
    /**
     * In case the Test found by the `where` argument doesn't exist, create a new Test with this data.
     */
    create: XOR<TestCreateInput, TestUncheckedCreateInput>
    /**
     * In case the Test was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestUpdateInput, TestUncheckedUpdateInput>
  }

  /**
   * Test delete
   */
  export type TestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter which Test to delete.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test deleteMany
   */
  export type TestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tests to delete
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to delete.
     */
    limit?: number
  }

  /**
   * Test.testCases
   */
  export type Test$testCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    where?: TestCaseWhereInput
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    cursor?: TestCaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * Test.files
   */
  export type Test$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
    where?: TestFileWhereInput
    orderBy?: TestFileOrderByWithRelationInput | TestFileOrderByWithRelationInput[]
    cursor?: TestFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestFileScalarFieldEnum | TestFileScalarFieldEnum[]
  }

  /**
   * Test.submissions
   */
  export type Test$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Test.submissionEvents
   */
  export type Test$submissionEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    where?: SubmissionEventWhereInput
    orderBy?: SubmissionEventOrderByWithRelationInput | SubmissionEventOrderByWithRelationInput[]
    cursor?: SubmissionEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionEventScalarFieldEnum | SubmissionEventScalarFieldEnum[]
  }

  /**
   * Test without action
   */
  export type TestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
  }


  /**
   * Model TestCase
   */

  export type AggregateTestCase = {
    _count: TestCaseCountAggregateOutputType | null
    _avg: TestCaseAvgAggregateOutputType | null
    _sum: TestCaseSumAggregateOutputType | null
    _min: TestCaseMinAggregateOutputType | null
    _max: TestCaseMaxAggregateOutputType | null
  }

  export type TestCaseAvgAggregateOutputType = {
    points: number | null
  }

  export type TestCaseSumAggregateOutputType = {
    points: number | null
  }

  export type TestCaseMinAggregateOutputType = {
    id: string | null
    description: string | null
    input: string | null
    expectedOutput: string | null
    category: string | null
    difficulty: string | null
    points: number | null
    verificationMethod: string | null
    testId: string | null
  }

  export type TestCaseMaxAggregateOutputType = {
    id: string | null
    description: string | null
    input: string | null
    expectedOutput: string | null
    category: string | null
    difficulty: string | null
    points: number | null
    verificationMethod: string | null
    testId: string | null
  }

  export type TestCaseCountAggregateOutputType = {
    id: number
    description: number
    input: number
    expectedOutput: number
    category: number
    difficulty: number
    points: number
    verificationMethod: number
    testId: number
    _all: number
  }


  export type TestCaseAvgAggregateInputType = {
    points?: true
  }

  export type TestCaseSumAggregateInputType = {
    points?: true
  }

  export type TestCaseMinAggregateInputType = {
    id?: true
    description?: true
    input?: true
    expectedOutput?: true
    category?: true
    difficulty?: true
    points?: true
    verificationMethod?: true
    testId?: true
  }

  export type TestCaseMaxAggregateInputType = {
    id?: true
    description?: true
    input?: true
    expectedOutput?: true
    category?: true
    difficulty?: true
    points?: true
    verificationMethod?: true
    testId?: true
  }

  export type TestCaseCountAggregateInputType = {
    id?: true
    description?: true
    input?: true
    expectedOutput?: true
    category?: true
    difficulty?: true
    points?: true
    verificationMethod?: true
    testId?: true
    _all?: true
  }

  export type TestCaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestCase to aggregate.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestCases
    **/
    _count?: true | TestCaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestCaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestCaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestCaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestCaseMaxAggregateInputType
  }

  export type GetTestCaseAggregateType<T extends TestCaseAggregateArgs> = {
        [P in keyof T & keyof AggregateTestCase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestCase[P]>
      : GetScalarType<T[P], AggregateTestCase[P]>
  }




  export type TestCaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestCaseWhereInput
    orderBy?: TestCaseOrderByWithAggregationInput | TestCaseOrderByWithAggregationInput[]
    by: TestCaseScalarFieldEnum[] | TestCaseScalarFieldEnum
    having?: TestCaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestCaseCountAggregateInputType | true
    _avg?: TestCaseAvgAggregateInputType
    _sum?: TestCaseSumAggregateInputType
    _min?: TestCaseMinAggregateInputType
    _max?: TestCaseMaxAggregateInputType
  }

  export type TestCaseGroupByOutputType = {
    id: string
    description: string
    input: string | null
    expectedOutput: string
    category: string | null
    difficulty: string | null
    points: number | null
    verificationMethod: string | null
    testId: string
    _count: TestCaseCountAggregateOutputType | null
    _avg: TestCaseAvgAggregateOutputType | null
    _sum: TestCaseSumAggregateOutputType | null
    _min: TestCaseMinAggregateOutputType | null
    _max: TestCaseMaxAggregateOutputType | null
  }

  type GetTestCaseGroupByPayload<T extends TestCaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestCaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestCaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestCaseGroupByOutputType[P]>
            : GetScalarType<T[P], TestCaseGroupByOutputType[P]>
        }
      >
    >


  export type TestCaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    input?: boolean
    expectedOutput?: boolean
    category?: boolean
    difficulty?: boolean
    points?: boolean
    verificationMethod?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testCase"]>

  export type TestCaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    input?: boolean
    expectedOutput?: boolean
    category?: boolean
    difficulty?: boolean
    points?: boolean
    verificationMethod?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testCase"]>

  export type TestCaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    input?: boolean
    expectedOutput?: boolean
    category?: boolean
    difficulty?: boolean
    points?: boolean
    verificationMethod?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testCase"]>

  export type TestCaseSelectScalar = {
    id?: boolean
    description?: boolean
    input?: boolean
    expectedOutput?: boolean
    category?: boolean
    difficulty?: boolean
    points?: boolean
    verificationMethod?: boolean
    testId?: boolean
  }

  export type TestCaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "description" | "input" | "expectedOutput" | "category" | "difficulty" | "points" | "verificationMethod" | "testId", ExtArgs["result"]["testCase"]>
  export type TestCaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestCaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestCaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }

  export type $TestCasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestCase"
    objects: {
      test: Prisma.$TestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      description: string
      input: string | null
      expectedOutput: string
      category: string | null
      difficulty: string | null
      points: number | null
      verificationMethod: string | null
      testId: string
    }, ExtArgs["result"]["testCase"]>
    composites: {}
  }

  type TestCaseGetPayload<S extends boolean | null | undefined | TestCaseDefaultArgs> = $Result.GetResult<Prisma.$TestCasePayload, S>

  type TestCaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestCaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestCaseCountAggregateInputType | true
    }

  export interface TestCaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestCase'], meta: { name: 'TestCase' } }
    /**
     * Find zero or one TestCase that matches the filter.
     * @param {TestCaseFindUniqueArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestCaseFindUniqueArgs>(args: SelectSubset<T, TestCaseFindUniqueArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestCase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestCaseFindUniqueOrThrowArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestCaseFindUniqueOrThrowArgs>(args: SelectSubset<T, TestCaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestCase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseFindFirstArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestCaseFindFirstArgs>(args?: SelectSubset<T, TestCaseFindFirstArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestCase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseFindFirstOrThrowArgs} args - Arguments to find a TestCase
     * @example
     * // Get one TestCase
     * const testCase = await prisma.testCase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestCaseFindFirstOrThrowArgs>(args?: SelectSubset<T, TestCaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestCases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestCases
     * const testCases = await prisma.testCase.findMany()
     * 
     * // Get first 10 TestCases
     * const testCases = await prisma.testCase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testCaseWithIdOnly = await prisma.testCase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestCaseFindManyArgs>(args?: SelectSubset<T, TestCaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestCase.
     * @param {TestCaseCreateArgs} args - Arguments to create a TestCase.
     * @example
     * // Create one TestCase
     * const TestCase = await prisma.testCase.create({
     *   data: {
     *     // ... data to create a TestCase
     *   }
     * })
     * 
     */
    create<T extends TestCaseCreateArgs>(args: SelectSubset<T, TestCaseCreateArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestCases.
     * @param {TestCaseCreateManyArgs} args - Arguments to create many TestCases.
     * @example
     * // Create many TestCases
     * const testCase = await prisma.testCase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestCaseCreateManyArgs>(args?: SelectSubset<T, TestCaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestCases and returns the data saved in the database.
     * @param {TestCaseCreateManyAndReturnArgs} args - Arguments to create many TestCases.
     * @example
     * // Create many TestCases
     * const testCase = await prisma.testCase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestCases and only return the `id`
     * const testCaseWithIdOnly = await prisma.testCase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestCaseCreateManyAndReturnArgs>(args?: SelectSubset<T, TestCaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestCase.
     * @param {TestCaseDeleteArgs} args - Arguments to delete one TestCase.
     * @example
     * // Delete one TestCase
     * const TestCase = await prisma.testCase.delete({
     *   where: {
     *     // ... filter to delete one TestCase
     *   }
     * })
     * 
     */
    delete<T extends TestCaseDeleteArgs>(args: SelectSubset<T, TestCaseDeleteArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestCase.
     * @param {TestCaseUpdateArgs} args - Arguments to update one TestCase.
     * @example
     * // Update one TestCase
     * const testCase = await prisma.testCase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestCaseUpdateArgs>(args: SelectSubset<T, TestCaseUpdateArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestCases.
     * @param {TestCaseDeleteManyArgs} args - Arguments to filter TestCases to delete.
     * @example
     * // Delete a few TestCases
     * const { count } = await prisma.testCase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestCaseDeleteManyArgs>(args?: SelectSubset<T, TestCaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestCases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestCases
     * const testCase = await prisma.testCase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestCaseUpdateManyArgs>(args: SelectSubset<T, TestCaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestCases and returns the data updated in the database.
     * @param {TestCaseUpdateManyAndReturnArgs} args - Arguments to update many TestCases.
     * @example
     * // Update many TestCases
     * const testCase = await prisma.testCase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestCases and only return the `id`
     * const testCaseWithIdOnly = await prisma.testCase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestCaseUpdateManyAndReturnArgs>(args: SelectSubset<T, TestCaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestCase.
     * @param {TestCaseUpsertArgs} args - Arguments to update or create a TestCase.
     * @example
     * // Update or create a TestCase
     * const testCase = await prisma.testCase.upsert({
     *   create: {
     *     // ... data to create a TestCase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestCase we want to update
     *   }
     * })
     */
    upsert<T extends TestCaseUpsertArgs>(args: SelectSubset<T, TestCaseUpsertArgs<ExtArgs>>): Prisma__TestCaseClient<$Result.GetResult<Prisma.$TestCasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestCases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseCountArgs} args - Arguments to filter TestCases to count.
     * @example
     * // Count the number of TestCases
     * const count = await prisma.testCase.count({
     *   where: {
     *     // ... the filter for the TestCases we want to count
     *   }
     * })
    **/
    count<T extends TestCaseCountArgs>(
      args?: Subset<T, TestCaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestCaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestCase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestCaseAggregateArgs>(args: Subset<T, TestCaseAggregateArgs>): Prisma.PrismaPromise<GetTestCaseAggregateType<T>>

    /**
     * Group by TestCase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestCaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestCaseGroupByArgs['orderBy'] }
        : { orderBy?: TestCaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestCaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestCaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestCase model
   */
  readonly fields: TestCaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestCase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestCaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestCase model
   */
  interface TestCaseFieldRefs {
    readonly id: FieldRef<"TestCase", 'String'>
    readonly description: FieldRef<"TestCase", 'String'>
    readonly input: FieldRef<"TestCase", 'String'>
    readonly expectedOutput: FieldRef<"TestCase", 'String'>
    readonly category: FieldRef<"TestCase", 'String'>
    readonly difficulty: FieldRef<"TestCase", 'String'>
    readonly points: FieldRef<"TestCase", 'Int'>
    readonly verificationMethod: FieldRef<"TestCase", 'String'>
    readonly testId: FieldRef<"TestCase", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TestCase findUnique
   */
  export type TestCaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase findUniqueOrThrow
   */
  export type TestCaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase findFirst
   */
  export type TestCaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestCases.
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestCases.
     */
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * TestCase findFirstOrThrow
   */
  export type TestCaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCase to fetch.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestCases.
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestCases.
     */
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * TestCase findMany
   */
  export type TestCaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter, which TestCases to fetch.
     */
    where?: TestCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestCases to fetch.
     */
    orderBy?: TestCaseOrderByWithRelationInput | TestCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestCases.
     */
    cursor?: TestCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestCases.
     */
    skip?: number
    distinct?: TestCaseScalarFieldEnum | TestCaseScalarFieldEnum[]
  }

  /**
   * TestCase create
   */
  export type TestCaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * The data needed to create a TestCase.
     */
    data: XOR<TestCaseCreateInput, TestCaseUncheckedCreateInput>
  }

  /**
   * TestCase createMany
   */
  export type TestCaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestCases.
     */
    data: TestCaseCreateManyInput | TestCaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestCase createManyAndReturn
   */
  export type TestCaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * The data used to create many TestCases.
     */
    data: TestCaseCreateManyInput | TestCaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestCase update
   */
  export type TestCaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * The data needed to update a TestCase.
     */
    data: XOR<TestCaseUpdateInput, TestCaseUncheckedUpdateInput>
    /**
     * Choose, which TestCase to update.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase updateMany
   */
  export type TestCaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestCases.
     */
    data: XOR<TestCaseUpdateManyMutationInput, TestCaseUncheckedUpdateManyInput>
    /**
     * Filter which TestCases to update
     */
    where?: TestCaseWhereInput
    /**
     * Limit how many TestCases to update.
     */
    limit?: number
  }

  /**
   * TestCase updateManyAndReturn
   */
  export type TestCaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * The data used to update TestCases.
     */
    data: XOR<TestCaseUpdateManyMutationInput, TestCaseUncheckedUpdateManyInput>
    /**
     * Filter which TestCases to update
     */
    where?: TestCaseWhereInput
    /**
     * Limit how many TestCases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestCase upsert
   */
  export type TestCaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * The filter to search for the TestCase to update in case it exists.
     */
    where: TestCaseWhereUniqueInput
    /**
     * In case the TestCase found by the `where` argument doesn't exist, create a new TestCase with this data.
     */
    create: XOR<TestCaseCreateInput, TestCaseUncheckedCreateInput>
    /**
     * In case the TestCase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestCaseUpdateInput, TestCaseUncheckedUpdateInput>
  }

  /**
   * TestCase delete
   */
  export type TestCaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
    /**
     * Filter which TestCase to delete.
     */
    where: TestCaseWhereUniqueInput
  }

  /**
   * TestCase deleteMany
   */
  export type TestCaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestCases to delete
     */
    where?: TestCaseWhereInput
    /**
     * Limit how many TestCases to delete.
     */
    limit?: number
  }

  /**
   * TestCase without action
   */
  export type TestCaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCase
     */
    select?: TestCaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestCase
     */
    omit?: TestCaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestCaseInclude<ExtArgs> | null
  }


  /**
   * Model TestFile
   */

  export type AggregateTestFile = {
    _count: TestFileCountAggregateOutputType | null
    _min: TestFileMinAggregateOutputType | null
    _max: TestFileMaxAggregateOutputType | null
  }

  export type TestFileMinAggregateOutputType = {
    id: string | null
    path: string | null
    content: string | null
    testId: string | null
  }

  export type TestFileMaxAggregateOutputType = {
    id: string | null
    path: string | null
    content: string | null
    testId: string | null
  }

  export type TestFileCountAggregateOutputType = {
    id: number
    path: number
    content: number
    testId: number
    _all: number
  }


  export type TestFileMinAggregateInputType = {
    id?: true
    path?: true
    content?: true
    testId?: true
  }

  export type TestFileMaxAggregateInputType = {
    id?: true
    path?: true
    content?: true
    testId?: true
  }

  export type TestFileCountAggregateInputType = {
    id?: true
    path?: true
    content?: true
    testId?: true
    _all?: true
  }

  export type TestFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestFile to aggregate.
     */
    where?: TestFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestFiles to fetch.
     */
    orderBy?: TestFileOrderByWithRelationInput | TestFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestFiles
    **/
    _count?: true | TestFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestFileMaxAggregateInputType
  }

  export type GetTestFileAggregateType<T extends TestFileAggregateArgs> = {
        [P in keyof T & keyof AggregateTestFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestFile[P]>
      : GetScalarType<T[P], AggregateTestFile[P]>
  }




  export type TestFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestFileWhereInput
    orderBy?: TestFileOrderByWithAggregationInput | TestFileOrderByWithAggregationInput[]
    by: TestFileScalarFieldEnum[] | TestFileScalarFieldEnum
    having?: TestFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestFileCountAggregateInputType | true
    _min?: TestFileMinAggregateInputType
    _max?: TestFileMaxAggregateInputType
  }

  export type TestFileGroupByOutputType = {
    id: string
    path: string
    content: string
    testId: string
    _count: TestFileCountAggregateOutputType | null
    _min: TestFileMinAggregateOutputType | null
    _max: TestFileMaxAggregateOutputType | null
  }

  type GetTestFileGroupByPayload<T extends TestFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestFileGroupByOutputType[P]>
            : GetScalarType<T[P], TestFileGroupByOutputType[P]>
        }
      >
    >


  export type TestFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    path?: boolean
    content?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testFile"]>

  export type TestFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    path?: boolean
    content?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testFile"]>

  export type TestFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    path?: boolean
    content?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testFile"]>

  export type TestFileSelectScalar = {
    id?: boolean
    path?: boolean
    content?: boolean
    testId?: boolean
  }

  export type TestFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "path" | "content" | "testId", ExtArgs["result"]["testFile"]>
  export type TestFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }

  export type $TestFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestFile"
    objects: {
      test: Prisma.$TestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      path: string
      content: string
      testId: string
    }, ExtArgs["result"]["testFile"]>
    composites: {}
  }

  type TestFileGetPayload<S extends boolean | null | undefined | TestFileDefaultArgs> = $Result.GetResult<Prisma.$TestFilePayload, S>

  type TestFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestFileCountAggregateInputType | true
    }

  export interface TestFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestFile'], meta: { name: 'TestFile' } }
    /**
     * Find zero or one TestFile that matches the filter.
     * @param {TestFileFindUniqueArgs} args - Arguments to find a TestFile
     * @example
     * // Get one TestFile
     * const testFile = await prisma.testFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestFileFindUniqueArgs>(args: SelectSubset<T, TestFileFindUniqueArgs<ExtArgs>>): Prisma__TestFileClient<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestFileFindUniqueOrThrowArgs} args - Arguments to find a TestFile
     * @example
     * // Get one TestFile
     * const testFile = await prisma.testFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestFileFindUniqueOrThrowArgs>(args: SelectSubset<T, TestFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestFileClient<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFileFindFirstArgs} args - Arguments to find a TestFile
     * @example
     * // Get one TestFile
     * const testFile = await prisma.testFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestFileFindFirstArgs>(args?: SelectSubset<T, TestFileFindFirstArgs<ExtArgs>>): Prisma__TestFileClient<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFileFindFirstOrThrowArgs} args - Arguments to find a TestFile
     * @example
     * // Get one TestFile
     * const testFile = await prisma.testFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestFileFindFirstOrThrowArgs>(args?: SelectSubset<T, TestFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestFileClient<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestFiles
     * const testFiles = await prisma.testFile.findMany()
     * 
     * // Get first 10 TestFiles
     * const testFiles = await prisma.testFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testFileWithIdOnly = await prisma.testFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestFileFindManyArgs>(args?: SelectSubset<T, TestFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestFile.
     * @param {TestFileCreateArgs} args - Arguments to create a TestFile.
     * @example
     * // Create one TestFile
     * const TestFile = await prisma.testFile.create({
     *   data: {
     *     // ... data to create a TestFile
     *   }
     * })
     * 
     */
    create<T extends TestFileCreateArgs>(args: SelectSubset<T, TestFileCreateArgs<ExtArgs>>): Prisma__TestFileClient<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestFiles.
     * @param {TestFileCreateManyArgs} args - Arguments to create many TestFiles.
     * @example
     * // Create many TestFiles
     * const testFile = await prisma.testFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestFileCreateManyArgs>(args?: SelectSubset<T, TestFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestFiles and returns the data saved in the database.
     * @param {TestFileCreateManyAndReturnArgs} args - Arguments to create many TestFiles.
     * @example
     * // Create many TestFiles
     * const testFile = await prisma.testFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestFiles and only return the `id`
     * const testFileWithIdOnly = await prisma.testFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestFileCreateManyAndReturnArgs>(args?: SelectSubset<T, TestFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestFile.
     * @param {TestFileDeleteArgs} args - Arguments to delete one TestFile.
     * @example
     * // Delete one TestFile
     * const TestFile = await prisma.testFile.delete({
     *   where: {
     *     // ... filter to delete one TestFile
     *   }
     * })
     * 
     */
    delete<T extends TestFileDeleteArgs>(args: SelectSubset<T, TestFileDeleteArgs<ExtArgs>>): Prisma__TestFileClient<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestFile.
     * @param {TestFileUpdateArgs} args - Arguments to update one TestFile.
     * @example
     * // Update one TestFile
     * const testFile = await prisma.testFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestFileUpdateArgs>(args: SelectSubset<T, TestFileUpdateArgs<ExtArgs>>): Prisma__TestFileClient<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestFiles.
     * @param {TestFileDeleteManyArgs} args - Arguments to filter TestFiles to delete.
     * @example
     * // Delete a few TestFiles
     * const { count } = await prisma.testFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestFileDeleteManyArgs>(args?: SelectSubset<T, TestFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestFiles
     * const testFile = await prisma.testFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestFileUpdateManyArgs>(args: SelectSubset<T, TestFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestFiles and returns the data updated in the database.
     * @param {TestFileUpdateManyAndReturnArgs} args - Arguments to update many TestFiles.
     * @example
     * // Update many TestFiles
     * const testFile = await prisma.testFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestFiles and only return the `id`
     * const testFileWithIdOnly = await prisma.testFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestFileUpdateManyAndReturnArgs>(args: SelectSubset<T, TestFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestFile.
     * @param {TestFileUpsertArgs} args - Arguments to update or create a TestFile.
     * @example
     * // Update or create a TestFile
     * const testFile = await prisma.testFile.upsert({
     *   create: {
     *     // ... data to create a TestFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestFile we want to update
     *   }
     * })
     */
    upsert<T extends TestFileUpsertArgs>(args: SelectSubset<T, TestFileUpsertArgs<ExtArgs>>): Prisma__TestFileClient<$Result.GetResult<Prisma.$TestFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFileCountArgs} args - Arguments to filter TestFiles to count.
     * @example
     * // Count the number of TestFiles
     * const count = await prisma.testFile.count({
     *   where: {
     *     // ... the filter for the TestFiles we want to count
     *   }
     * })
    **/
    count<T extends TestFileCountArgs>(
      args?: Subset<T, TestFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestFileAggregateArgs>(args: Subset<T, TestFileAggregateArgs>): Prisma.PrismaPromise<GetTestFileAggregateType<T>>

    /**
     * Group by TestFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestFileGroupByArgs['orderBy'] }
        : { orderBy?: TestFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestFile model
   */
  readonly fields: TestFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestFile model
   */
  interface TestFileFieldRefs {
    readonly id: FieldRef<"TestFile", 'String'>
    readonly path: FieldRef<"TestFile", 'String'>
    readonly content: FieldRef<"TestFile", 'String'>
    readonly testId: FieldRef<"TestFile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TestFile findUnique
   */
  export type TestFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
    /**
     * Filter, which TestFile to fetch.
     */
    where: TestFileWhereUniqueInput
  }

  /**
   * TestFile findUniqueOrThrow
   */
  export type TestFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
    /**
     * Filter, which TestFile to fetch.
     */
    where: TestFileWhereUniqueInput
  }

  /**
   * TestFile findFirst
   */
  export type TestFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
    /**
     * Filter, which TestFile to fetch.
     */
    where?: TestFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestFiles to fetch.
     */
    orderBy?: TestFileOrderByWithRelationInput | TestFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestFiles.
     */
    cursor?: TestFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestFiles.
     */
    distinct?: TestFileScalarFieldEnum | TestFileScalarFieldEnum[]
  }

  /**
   * TestFile findFirstOrThrow
   */
  export type TestFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
    /**
     * Filter, which TestFile to fetch.
     */
    where?: TestFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestFiles to fetch.
     */
    orderBy?: TestFileOrderByWithRelationInput | TestFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestFiles.
     */
    cursor?: TestFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestFiles.
     */
    distinct?: TestFileScalarFieldEnum | TestFileScalarFieldEnum[]
  }

  /**
   * TestFile findMany
   */
  export type TestFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
    /**
     * Filter, which TestFiles to fetch.
     */
    where?: TestFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestFiles to fetch.
     */
    orderBy?: TestFileOrderByWithRelationInput | TestFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestFiles.
     */
    cursor?: TestFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestFiles.
     */
    skip?: number
    distinct?: TestFileScalarFieldEnum | TestFileScalarFieldEnum[]
  }

  /**
   * TestFile create
   */
  export type TestFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
    /**
     * The data needed to create a TestFile.
     */
    data: XOR<TestFileCreateInput, TestFileUncheckedCreateInput>
  }

  /**
   * TestFile createMany
   */
  export type TestFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestFiles.
     */
    data: TestFileCreateManyInput | TestFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestFile createManyAndReturn
   */
  export type TestFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * The data used to create many TestFiles.
     */
    data: TestFileCreateManyInput | TestFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestFile update
   */
  export type TestFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
    /**
     * The data needed to update a TestFile.
     */
    data: XOR<TestFileUpdateInput, TestFileUncheckedUpdateInput>
    /**
     * Choose, which TestFile to update.
     */
    where: TestFileWhereUniqueInput
  }

  /**
   * TestFile updateMany
   */
  export type TestFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestFiles.
     */
    data: XOR<TestFileUpdateManyMutationInput, TestFileUncheckedUpdateManyInput>
    /**
     * Filter which TestFiles to update
     */
    where?: TestFileWhereInput
    /**
     * Limit how many TestFiles to update.
     */
    limit?: number
  }

  /**
   * TestFile updateManyAndReturn
   */
  export type TestFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * The data used to update TestFiles.
     */
    data: XOR<TestFileUpdateManyMutationInput, TestFileUncheckedUpdateManyInput>
    /**
     * Filter which TestFiles to update
     */
    where?: TestFileWhereInput
    /**
     * Limit how many TestFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestFile upsert
   */
  export type TestFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
    /**
     * The filter to search for the TestFile to update in case it exists.
     */
    where: TestFileWhereUniqueInput
    /**
     * In case the TestFile found by the `where` argument doesn't exist, create a new TestFile with this data.
     */
    create: XOR<TestFileCreateInput, TestFileUncheckedCreateInput>
    /**
     * In case the TestFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestFileUpdateInput, TestFileUncheckedUpdateInput>
  }

  /**
   * TestFile delete
   */
  export type TestFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
    /**
     * Filter which TestFile to delete.
     */
    where: TestFileWhereUniqueInput
  }

  /**
   * TestFile deleteMany
   */
  export type TestFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestFiles to delete
     */
    where?: TestFileWhereInput
    /**
     * Limit how many TestFiles to delete.
     */
    limit?: number
  }

  /**
   * TestFile without action
   */
  export type TestFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestFile
     */
    select?: TestFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestFile
     */
    omit?: TestFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestFileInclude<ExtArgs> | null
  }


  /**
   * Model Submission
   */

  export type AggregateSubmission = {
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  export type SubmissionAvgAggregateOutputType = {
    aiScore: number | null
  }

  export type SubmissionSumAggregateOutputType = {
    aiScore: number | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    status: string | null
    testId: string | null
    userId: string | null
    aiScore: number | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    status: string | null
    testId: string | null
    userId: string | null
    aiScore: number | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    status: number
    result: number
    feedback: number
    testId: number
    userId: number
    aiScore: number
    _all: number
  }


  export type SubmissionAvgAggregateInputType = {
    aiScore?: true
  }

  export type SubmissionSumAggregateInputType = {
    aiScore?: true
  }

  export type SubmissionMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    status?: true
    testId?: true
    userId?: true
    aiScore?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    status?: true
    testId?: true
    userId?: true
    aiScore?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    status?: true
    result?: true
    feedback?: true
    testId?: true
    userId?: true
    aiScore?: true
    _all?: true
  }

  export type SubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submission to aggregate.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Submissions
    **/
    _count?: true | SubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionMaxAggregateInputType
  }

  export type GetSubmissionAggregateType<T extends SubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmission[P]>
      : GetScalarType<T[P], AggregateSubmission[P]>
  }




  export type SubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithAggregationInput | SubmissionOrderByWithAggregationInput[]
    by: SubmissionScalarFieldEnum[] | SubmissionScalarFieldEnum
    having?: SubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionCountAggregateInputType | true
    _avg?: SubmissionAvgAggregateInputType
    _sum?: SubmissionSumAggregateInputType
    _min?: SubmissionMinAggregateInputType
    _max?: SubmissionMaxAggregateInputType
  }

  export type SubmissionGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    status: string
    result: JsonValue | null
    feedback: JsonValue | null
    testId: string
    userId: string | null
    aiScore: number | null
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  type GetSubmissionGroupByPayload<T extends SubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    result?: boolean
    feedback?: boolean
    testId?: boolean
    userId?: boolean
    aiScore?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    user?: boolean | Submission$userArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    result?: boolean
    feedback?: boolean
    testId?: boolean
    userId?: boolean
    aiScore?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    user?: boolean | Submission$userArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    result?: boolean
    feedback?: boolean
    testId?: boolean
    userId?: boolean
    aiScore?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    user?: boolean | Submission$userArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    result?: boolean
    feedback?: boolean
    testId?: boolean
    userId?: boolean
    aiScore?: boolean
  }

  export type SubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "status" | "result" | "feedback" | "testId" | "userId" | "aiScore", ExtArgs["result"]["submission"]>
  export type SubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    user?: boolean | Submission$userArgs<ExtArgs>
  }
  export type SubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    user?: boolean | Submission$userArgs<ExtArgs>
  }
  export type SubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    user?: boolean | Submission$userArgs<ExtArgs>
  }

  export type $SubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Submission"
    objects: {
      test: Prisma.$TestPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      status: string
      result: Prisma.JsonValue | null
      feedback: Prisma.JsonValue | null
      testId: string
      userId: string | null
      aiScore: number | null
    }, ExtArgs["result"]["submission"]>
    composites: {}
  }

  type SubmissionGetPayload<S extends boolean | null | undefined | SubmissionDefaultArgs> = $Result.GetResult<Prisma.$SubmissionPayload, S>

  type SubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmissionCountAggregateInputType | true
    }

  export interface SubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Submission'], meta: { name: 'Submission' } }
    /**
     * Find zero or one Submission that matches the filter.
     * @param {SubmissionFindUniqueArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionFindUniqueArgs>(args: SelectSubset<T, SubmissionFindUniqueArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Submission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmissionFindUniqueOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionFindFirstArgs>(args?: SelectSubset<T, SubmissionFindFirstArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Submissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Submissions
     * const submissions = await prisma.submission.findMany()
     * 
     * // Get first 10 Submissions
     * const submissions = await prisma.submission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionWithIdOnly = await prisma.submission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionFindManyArgs>(args?: SelectSubset<T, SubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Submission.
     * @param {SubmissionCreateArgs} args - Arguments to create a Submission.
     * @example
     * // Create one Submission
     * const Submission = await prisma.submission.create({
     *   data: {
     *     // ... data to create a Submission
     *   }
     * })
     * 
     */
    create<T extends SubmissionCreateArgs>(args: SelectSubset<T, SubmissionCreateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Submissions.
     * @param {SubmissionCreateManyArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionCreateManyArgs>(args?: SelectSubset<T, SubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Submissions and returns the data saved in the database.
     * @param {SubmissionCreateManyAndReturnArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Submission.
     * @param {SubmissionDeleteArgs} args - Arguments to delete one Submission.
     * @example
     * // Delete one Submission
     * const Submission = await prisma.submission.delete({
     *   where: {
     *     // ... filter to delete one Submission
     *   }
     * })
     * 
     */
    delete<T extends SubmissionDeleteArgs>(args: SelectSubset<T, SubmissionDeleteArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Submission.
     * @param {SubmissionUpdateArgs} args - Arguments to update one Submission.
     * @example
     * // Update one Submission
     * const submission = await prisma.submission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionUpdateArgs>(args: SelectSubset<T, SubmissionUpdateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Submissions.
     * @param {SubmissionDeleteManyArgs} args - Arguments to filter Submissions to delete.
     * @example
     * // Delete a few Submissions
     * const { count } = await prisma.submission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionDeleteManyArgs>(args?: SelectSubset<T, SubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionUpdateManyArgs>(args: SelectSubset<T, SubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions and returns the data updated in the database.
     * @param {SubmissionUpdateManyAndReturnArgs} args - Arguments to update many Submissions.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Submission.
     * @param {SubmissionUpsertArgs} args - Arguments to update or create a Submission.
     * @example
     * // Update or create a Submission
     * const submission = await prisma.submission.upsert({
     *   create: {
     *     // ... data to create a Submission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Submission we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionUpsertArgs>(args: SelectSubset<T, SubmissionUpsertArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionCountArgs} args - Arguments to filter Submissions to count.
     * @example
     * // Count the number of Submissions
     * const count = await prisma.submission.count({
     *   where: {
     *     // ... the filter for the Submissions we want to count
     *   }
     * })
    **/
    count<T extends SubmissionCountArgs>(
      args?: Subset<T, SubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubmissionAggregateArgs>(args: Subset<T, SubmissionAggregateArgs>): Prisma.PrismaPromise<GetSubmissionAggregateType<T>>

    /**
     * Group by Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Submission model
   */
  readonly fields: SubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Submission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends Submission$userArgs<ExtArgs> = {}>(args?: Subset<T, Submission$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Submission model
   */
  interface SubmissionFieldRefs {
    readonly id: FieldRef<"Submission", 'String'>
    readonly createdAt: FieldRef<"Submission", 'DateTime'>
    readonly updatedAt: FieldRef<"Submission", 'DateTime'>
    readonly status: FieldRef<"Submission", 'String'>
    readonly result: FieldRef<"Submission", 'Json'>
    readonly feedback: FieldRef<"Submission", 'Json'>
    readonly testId: FieldRef<"Submission", 'String'>
    readonly userId: FieldRef<"Submission", 'String'>
    readonly aiScore: FieldRef<"Submission", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Submission findUnique
   */
  export type SubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findUniqueOrThrow
   */
  export type SubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findFirst
   */
  export type SubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findFirstOrThrow
   */
  export type SubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findMany
   */
  export type SubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submissions to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission create
   */
  export type SubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Submission.
     */
    data: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
  }

  /**
   * Submission createMany
   */
  export type SubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Submission createManyAndReturn
   */
  export type SubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission update
   */
  export type SubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Submission.
     */
    data: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
    /**
     * Choose, which Submission to update.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission updateMany
   */
  export type SubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
  }

  /**
   * Submission updateManyAndReturn
   */
  export type SubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission upsert
   */
  export type SubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Submission to update in case it exists.
     */
    where: SubmissionWhereUniqueInput
    /**
     * In case the Submission found by the `where` argument doesn't exist, create a new Submission with this data.
     */
    create: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
    /**
     * In case the Submission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
  }

  /**
   * Submission delete
   */
  export type SubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter which Submission to delete.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission deleteMany
   */
  export type SubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submissions to delete
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to delete.
     */
    limit?: number
  }

  /**
   * Submission.user
   */
  export type Submission$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Submission without action
   */
  export type SubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
  }


  /**
   * Model SubmissionEvent
   */

  export type AggregateSubmissionEvent = {
    _count: SubmissionEventCountAggregateOutputType | null
    _min: SubmissionEventMinAggregateOutputType | null
    _max: SubmissionEventMaxAggregateOutputType | null
  }

  export type SubmissionEventMinAggregateOutputType = {
    id: string | null
    repoName: string | null
    commitSha: string | null
    branch: string | null
    pusher: string | null
    eventType: string | null
    receivedAt: Date | null
    candidateId: string | null
    testId: string | null
  }

  export type SubmissionEventMaxAggregateOutputType = {
    id: string | null
    repoName: string | null
    commitSha: string | null
    branch: string | null
    pusher: string | null
    eventType: string | null
    receivedAt: Date | null
    candidateId: string | null
    testId: string | null
  }

  export type SubmissionEventCountAggregateOutputType = {
    id: number
    repoName: number
    commitSha: number
    branch: number
    pusher: number
    eventType: number
    receivedAt: number
    candidateId: number
    testId: number
    _all: number
  }


  export type SubmissionEventMinAggregateInputType = {
    id?: true
    repoName?: true
    commitSha?: true
    branch?: true
    pusher?: true
    eventType?: true
    receivedAt?: true
    candidateId?: true
    testId?: true
  }

  export type SubmissionEventMaxAggregateInputType = {
    id?: true
    repoName?: true
    commitSha?: true
    branch?: true
    pusher?: true
    eventType?: true
    receivedAt?: true
    candidateId?: true
    testId?: true
  }

  export type SubmissionEventCountAggregateInputType = {
    id?: true
    repoName?: true
    commitSha?: true
    branch?: true
    pusher?: true
    eventType?: true
    receivedAt?: true
    candidateId?: true
    testId?: true
    _all?: true
  }

  export type SubmissionEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubmissionEvent to aggregate.
     */
    where?: SubmissionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmissionEvents to fetch.
     */
    orderBy?: SubmissionEventOrderByWithRelationInput | SubmissionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmissionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmissionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubmissionEvents
    **/
    _count?: true | SubmissionEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionEventMaxAggregateInputType
  }

  export type GetSubmissionEventAggregateType<T extends SubmissionEventAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmissionEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmissionEvent[P]>
      : GetScalarType<T[P], AggregateSubmissionEvent[P]>
  }




  export type SubmissionEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionEventWhereInput
    orderBy?: SubmissionEventOrderByWithAggregationInput | SubmissionEventOrderByWithAggregationInput[]
    by: SubmissionEventScalarFieldEnum[] | SubmissionEventScalarFieldEnum
    having?: SubmissionEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionEventCountAggregateInputType | true
    _min?: SubmissionEventMinAggregateInputType
    _max?: SubmissionEventMaxAggregateInputType
  }

  export type SubmissionEventGroupByOutputType = {
    id: string
    repoName: string
    commitSha: string
    branch: string
    pusher: string
    eventType: string
    receivedAt: Date
    candidateId: string | null
    testId: string | null
    _count: SubmissionEventCountAggregateOutputType | null
    _min: SubmissionEventMinAggregateOutputType | null
    _max: SubmissionEventMaxAggregateOutputType | null
  }

  type GetSubmissionEventGroupByPayload<T extends SubmissionEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionEventGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionEventGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repoName?: boolean
    commitSha?: boolean
    branch?: boolean
    pusher?: boolean
    eventType?: boolean
    receivedAt?: boolean
    candidateId?: boolean
    testId?: boolean
    candidate?: boolean | SubmissionEvent$candidateArgs<ExtArgs>
    test?: boolean | SubmissionEvent$testArgs<ExtArgs>
  }, ExtArgs["result"]["submissionEvent"]>

  export type SubmissionEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repoName?: boolean
    commitSha?: boolean
    branch?: boolean
    pusher?: boolean
    eventType?: boolean
    receivedAt?: boolean
    candidateId?: boolean
    testId?: boolean
    candidate?: boolean | SubmissionEvent$candidateArgs<ExtArgs>
    test?: boolean | SubmissionEvent$testArgs<ExtArgs>
  }, ExtArgs["result"]["submissionEvent"]>

  export type SubmissionEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repoName?: boolean
    commitSha?: boolean
    branch?: boolean
    pusher?: boolean
    eventType?: boolean
    receivedAt?: boolean
    candidateId?: boolean
    testId?: boolean
    candidate?: boolean | SubmissionEvent$candidateArgs<ExtArgs>
    test?: boolean | SubmissionEvent$testArgs<ExtArgs>
  }, ExtArgs["result"]["submissionEvent"]>

  export type SubmissionEventSelectScalar = {
    id?: boolean
    repoName?: boolean
    commitSha?: boolean
    branch?: boolean
    pusher?: boolean
    eventType?: boolean
    receivedAt?: boolean
    candidateId?: boolean
    testId?: boolean
  }

  export type SubmissionEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "repoName" | "commitSha" | "branch" | "pusher" | "eventType" | "receivedAt" | "candidateId" | "testId", ExtArgs["result"]["submissionEvent"]>
  export type SubmissionEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | SubmissionEvent$candidateArgs<ExtArgs>
    test?: boolean | SubmissionEvent$testArgs<ExtArgs>
  }
  export type SubmissionEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | SubmissionEvent$candidateArgs<ExtArgs>
    test?: boolean | SubmissionEvent$testArgs<ExtArgs>
  }
  export type SubmissionEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | SubmissionEvent$candidateArgs<ExtArgs>
    test?: boolean | SubmissionEvent$testArgs<ExtArgs>
  }

  export type $SubmissionEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubmissionEvent"
    objects: {
      candidate: Prisma.$CandidatePayload<ExtArgs> | null
      test: Prisma.$TestPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      repoName: string
      commitSha: string
      branch: string
      pusher: string
      eventType: string
      receivedAt: Date
      candidateId: string | null
      testId: string | null
    }, ExtArgs["result"]["submissionEvent"]>
    composites: {}
  }

  type SubmissionEventGetPayload<S extends boolean | null | undefined | SubmissionEventDefaultArgs> = $Result.GetResult<Prisma.$SubmissionEventPayload, S>

  type SubmissionEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmissionEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmissionEventCountAggregateInputType | true
    }

  export interface SubmissionEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubmissionEvent'], meta: { name: 'SubmissionEvent' } }
    /**
     * Find zero or one SubmissionEvent that matches the filter.
     * @param {SubmissionEventFindUniqueArgs} args - Arguments to find a SubmissionEvent
     * @example
     * // Get one SubmissionEvent
     * const submissionEvent = await prisma.submissionEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionEventFindUniqueArgs>(args: SelectSubset<T, SubmissionEventFindUniqueArgs<ExtArgs>>): Prisma__SubmissionEventClient<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubmissionEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmissionEventFindUniqueOrThrowArgs} args - Arguments to find a SubmissionEvent
     * @example
     * // Get one SubmissionEvent
     * const submissionEvent = await prisma.submissionEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionEventFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionEventClient<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubmissionEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionEventFindFirstArgs} args - Arguments to find a SubmissionEvent
     * @example
     * // Get one SubmissionEvent
     * const submissionEvent = await prisma.submissionEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionEventFindFirstArgs>(args?: SelectSubset<T, SubmissionEventFindFirstArgs<ExtArgs>>): Prisma__SubmissionEventClient<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubmissionEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionEventFindFirstOrThrowArgs} args - Arguments to find a SubmissionEvent
     * @example
     * // Get one SubmissionEvent
     * const submissionEvent = await prisma.submissionEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionEventFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionEventClient<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubmissionEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubmissionEvents
     * const submissionEvents = await prisma.submissionEvent.findMany()
     * 
     * // Get first 10 SubmissionEvents
     * const submissionEvents = await prisma.submissionEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionEventWithIdOnly = await prisma.submissionEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionEventFindManyArgs>(args?: SelectSubset<T, SubmissionEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubmissionEvent.
     * @param {SubmissionEventCreateArgs} args - Arguments to create a SubmissionEvent.
     * @example
     * // Create one SubmissionEvent
     * const SubmissionEvent = await prisma.submissionEvent.create({
     *   data: {
     *     // ... data to create a SubmissionEvent
     *   }
     * })
     * 
     */
    create<T extends SubmissionEventCreateArgs>(args: SelectSubset<T, SubmissionEventCreateArgs<ExtArgs>>): Prisma__SubmissionEventClient<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubmissionEvents.
     * @param {SubmissionEventCreateManyArgs} args - Arguments to create many SubmissionEvents.
     * @example
     * // Create many SubmissionEvents
     * const submissionEvent = await prisma.submissionEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionEventCreateManyArgs>(args?: SelectSubset<T, SubmissionEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubmissionEvents and returns the data saved in the database.
     * @param {SubmissionEventCreateManyAndReturnArgs} args - Arguments to create many SubmissionEvents.
     * @example
     * // Create many SubmissionEvents
     * const submissionEvent = await prisma.submissionEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubmissionEvents and only return the `id`
     * const submissionEventWithIdOnly = await prisma.submissionEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionEventCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubmissionEvent.
     * @param {SubmissionEventDeleteArgs} args - Arguments to delete one SubmissionEvent.
     * @example
     * // Delete one SubmissionEvent
     * const SubmissionEvent = await prisma.submissionEvent.delete({
     *   where: {
     *     // ... filter to delete one SubmissionEvent
     *   }
     * })
     * 
     */
    delete<T extends SubmissionEventDeleteArgs>(args: SelectSubset<T, SubmissionEventDeleteArgs<ExtArgs>>): Prisma__SubmissionEventClient<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubmissionEvent.
     * @param {SubmissionEventUpdateArgs} args - Arguments to update one SubmissionEvent.
     * @example
     * // Update one SubmissionEvent
     * const submissionEvent = await prisma.submissionEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionEventUpdateArgs>(args: SelectSubset<T, SubmissionEventUpdateArgs<ExtArgs>>): Prisma__SubmissionEventClient<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubmissionEvents.
     * @param {SubmissionEventDeleteManyArgs} args - Arguments to filter SubmissionEvents to delete.
     * @example
     * // Delete a few SubmissionEvents
     * const { count } = await prisma.submissionEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionEventDeleteManyArgs>(args?: SelectSubset<T, SubmissionEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubmissionEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubmissionEvents
     * const submissionEvent = await prisma.submissionEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionEventUpdateManyArgs>(args: SelectSubset<T, SubmissionEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubmissionEvents and returns the data updated in the database.
     * @param {SubmissionEventUpdateManyAndReturnArgs} args - Arguments to update many SubmissionEvents.
     * @example
     * // Update many SubmissionEvents
     * const submissionEvent = await prisma.submissionEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubmissionEvents and only return the `id`
     * const submissionEventWithIdOnly = await prisma.submissionEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubmissionEventUpdateManyAndReturnArgs>(args: SelectSubset<T, SubmissionEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubmissionEvent.
     * @param {SubmissionEventUpsertArgs} args - Arguments to update or create a SubmissionEvent.
     * @example
     * // Update or create a SubmissionEvent
     * const submissionEvent = await prisma.submissionEvent.upsert({
     *   create: {
     *     // ... data to create a SubmissionEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubmissionEvent we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionEventUpsertArgs>(args: SelectSubset<T, SubmissionEventUpsertArgs<ExtArgs>>): Prisma__SubmissionEventClient<$Result.GetResult<Prisma.$SubmissionEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubmissionEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionEventCountArgs} args - Arguments to filter SubmissionEvents to count.
     * @example
     * // Count the number of SubmissionEvents
     * const count = await prisma.submissionEvent.count({
     *   where: {
     *     // ... the filter for the SubmissionEvents we want to count
     *   }
     * })
    **/
    count<T extends SubmissionEventCountArgs>(
      args?: Subset<T, SubmissionEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubmissionEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubmissionEventAggregateArgs>(args: Subset<T, SubmissionEventAggregateArgs>): Prisma.PrismaPromise<GetSubmissionEventAggregateType<T>>

    /**
     * Group by SubmissionEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubmissionEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionEventGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubmissionEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubmissionEvent model
   */
  readonly fields: SubmissionEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubmissionEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidate<T extends SubmissionEvent$candidateArgs<ExtArgs> = {}>(args?: Subset<T, SubmissionEvent$candidateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    test<T extends SubmissionEvent$testArgs<ExtArgs> = {}>(args?: Subset<T, SubmissionEvent$testArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubmissionEvent model
   */
  interface SubmissionEventFieldRefs {
    readonly id: FieldRef<"SubmissionEvent", 'String'>
    readonly repoName: FieldRef<"SubmissionEvent", 'String'>
    readonly commitSha: FieldRef<"SubmissionEvent", 'String'>
    readonly branch: FieldRef<"SubmissionEvent", 'String'>
    readonly pusher: FieldRef<"SubmissionEvent", 'String'>
    readonly eventType: FieldRef<"SubmissionEvent", 'String'>
    readonly receivedAt: FieldRef<"SubmissionEvent", 'DateTime'>
    readonly candidateId: FieldRef<"SubmissionEvent", 'String'>
    readonly testId: FieldRef<"SubmissionEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SubmissionEvent findUnique
   */
  export type SubmissionEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    /**
     * Filter, which SubmissionEvent to fetch.
     */
    where: SubmissionEventWhereUniqueInput
  }

  /**
   * SubmissionEvent findUniqueOrThrow
   */
  export type SubmissionEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    /**
     * Filter, which SubmissionEvent to fetch.
     */
    where: SubmissionEventWhereUniqueInput
  }

  /**
   * SubmissionEvent findFirst
   */
  export type SubmissionEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    /**
     * Filter, which SubmissionEvent to fetch.
     */
    where?: SubmissionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmissionEvents to fetch.
     */
    orderBy?: SubmissionEventOrderByWithRelationInput | SubmissionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubmissionEvents.
     */
    cursor?: SubmissionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmissionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmissionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubmissionEvents.
     */
    distinct?: SubmissionEventScalarFieldEnum | SubmissionEventScalarFieldEnum[]
  }

  /**
   * SubmissionEvent findFirstOrThrow
   */
  export type SubmissionEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    /**
     * Filter, which SubmissionEvent to fetch.
     */
    where?: SubmissionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmissionEvents to fetch.
     */
    orderBy?: SubmissionEventOrderByWithRelationInput | SubmissionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubmissionEvents.
     */
    cursor?: SubmissionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmissionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmissionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubmissionEvents.
     */
    distinct?: SubmissionEventScalarFieldEnum | SubmissionEventScalarFieldEnum[]
  }

  /**
   * SubmissionEvent findMany
   */
  export type SubmissionEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    /**
     * Filter, which SubmissionEvents to fetch.
     */
    where?: SubmissionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmissionEvents to fetch.
     */
    orderBy?: SubmissionEventOrderByWithRelationInput | SubmissionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubmissionEvents.
     */
    cursor?: SubmissionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmissionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmissionEvents.
     */
    skip?: number
    distinct?: SubmissionEventScalarFieldEnum | SubmissionEventScalarFieldEnum[]
  }

  /**
   * SubmissionEvent create
   */
  export type SubmissionEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    /**
     * The data needed to create a SubmissionEvent.
     */
    data: XOR<SubmissionEventCreateInput, SubmissionEventUncheckedCreateInput>
  }

  /**
   * SubmissionEvent createMany
   */
  export type SubmissionEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubmissionEvents.
     */
    data: SubmissionEventCreateManyInput | SubmissionEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubmissionEvent createManyAndReturn
   */
  export type SubmissionEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * The data used to create many SubmissionEvents.
     */
    data: SubmissionEventCreateManyInput | SubmissionEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubmissionEvent update
   */
  export type SubmissionEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    /**
     * The data needed to update a SubmissionEvent.
     */
    data: XOR<SubmissionEventUpdateInput, SubmissionEventUncheckedUpdateInput>
    /**
     * Choose, which SubmissionEvent to update.
     */
    where: SubmissionEventWhereUniqueInput
  }

  /**
   * SubmissionEvent updateMany
   */
  export type SubmissionEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubmissionEvents.
     */
    data: XOR<SubmissionEventUpdateManyMutationInput, SubmissionEventUncheckedUpdateManyInput>
    /**
     * Filter which SubmissionEvents to update
     */
    where?: SubmissionEventWhereInput
    /**
     * Limit how many SubmissionEvents to update.
     */
    limit?: number
  }

  /**
   * SubmissionEvent updateManyAndReturn
   */
  export type SubmissionEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * The data used to update SubmissionEvents.
     */
    data: XOR<SubmissionEventUpdateManyMutationInput, SubmissionEventUncheckedUpdateManyInput>
    /**
     * Filter which SubmissionEvents to update
     */
    where?: SubmissionEventWhereInput
    /**
     * Limit how many SubmissionEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubmissionEvent upsert
   */
  export type SubmissionEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    /**
     * The filter to search for the SubmissionEvent to update in case it exists.
     */
    where: SubmissionEventWhereUniqueInput
    /**
     * In case the SubmissionEvent found by the `where` argument doesn't exist, create a new SubmissionEvent with this data.
     */
    create: XOR<SubmissionEventCreateInput, SubmissionEventUncheckedCreateInput>
    /**
     * In case the SubmissionEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionEventUpdateInput, SubmissionEventUncheckedUpdateInput>
  }

  /**
   * SubmissionEvent delete
   */
  export type SubmissionEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
    /**
     * Filter which SubmissionEvent to delete.
     */
    where: SubmissionEventWhereUniqueInput
  }

  /**
   * SubmissionEvent deleteMany
   */
  export type SubmissionEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubmissionEvents to delete
     */
    where?: SubmissionEventWhereInput
    /**
     * Limit how many SubmissionEvents to delete.
     */
    limit?: number
  }

  /**
   * SubmissionEvent.candidate
   */
  export type SubmissionEvent$candidateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    where?: CandidateWhereInput
  }

  /**
   * SubmissionEvent.test
   */
  export type SubmissionEvent$testArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    where?: TestWhereInput
  }

  /**
   * SubmissionEvent without action
   */
  export type SubmissionEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionEvent
     */
    select?: SubmissionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionEvent
     */
    omit?: SubmissionEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionEventInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    companyId: 'companyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const JobDescriptionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    minExperience: 'minExperience',
    maxExperience: 'maxExperience',
    languages: 'languages',
    projectContext: 'projectContext',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    creatorId: 'creatorId'
  };

  export type JobDescriptionScalarFieldEnum = (typeof JobDescriptionScalarFieldEnum)[keyof typeof JobDescriptionScalarFieldEnum]


  export const CandidateScalarFieldEnum: {
    id: 'id',
    status: 'status',
    suitabilityScore: 'suitabilityScore',
    suitabilityAnalysis: 'suitabilityAnalysis',
    individualRepoUrl: 'individualRepoUrl',
    repoCreatedAt: 'repoCreatedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    jobDescriptionId: 'jobDescriptionId',
    resumeId: 'resumeId'
  };

  export type CandidateScalarFieldEnum = (typeof CandidateScalarFieldEnum)[keyof typeof CandidateScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    email: 'email',
    filename: 'filename',
    path: 'path',
    size: 'size',
    analysis: 'analysis',
    uploadedAt: 'uploadedAt',
    updatedAt: 'updatedAt'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const TestScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    difficulty: 'difficulty',
    gitRepoUrl: 'gitRepoUrl',
    language: 'language',
    requirements: 'requirements',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    jobDescriptionId: 'jobDescriptionId',
    repoArchived: 'repoArchived',
    repoArchivedAt: 'repoArchivedAt'
  };

  export type TestScalarFieldEnum = (typeof TestScalarFieldEnum)[keyof typeof TestScalarFieldEnum]


  export const TestCaseScalarFieldEnum: {
    id: 'id',
    description: 'description',
    input: 'input',
    expectedOutput: 'expectedOutput',
    category: 'category',
    difficulty: 'difficulty',
    points: 'points',
    verificationMethod: 'verificationMethod',
    testId: 'testId'
  };

  export type TestCaseScalarFieldEnum = (typeof TestCaseScalarFieldEnum)[keyof typeof TestCaseScalarFieldEnum]


  export const TestFileScalarFieldEnum: {
    id: 'id',
    path: 'path',
    content: 'content',
    testId: 'testId'
  };

  export type TestFileScalarFieldEnum = (typeof TestFileScalarFieldEnum)[keyof typeof TestFileScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    status: 'status',
    result: 'result',
    feedback: 'feedback',
    testId: 'testId',
    userId: 'userId',
    aiScore: 'aiScore'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const SubmissionEventScalarFieldEnum: {
    id: 'id',
    repoName: 'repoName',
    commitSha: 'commitSha',
    branch: 'branch',
    pusher: 'pusher',
    eventType: 'eventType',
    receivedAt: 'receivedAt',
    candidateId: 'candidateId',
    testId: 'testId'
  };

  export type SubmissionEventScalarFieldEnum = (typeof SubmissionEventScalarFieldEnum)[keyof typeof SubmissionEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    companyId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    jobDescriptions?: JobDescriptionListRelationFilter
    submissions?: SubmissionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    jobDescriptions?: JobDescriptionOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    companyId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    jobDescriptions?: JobDescriptionListRelationFilter
    submissions?: SubmissionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    companyId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    users?: UserListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    users?: UserListRelationFilter
  }, "id" | "name">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
  }

  export type JobDescriptionWhereInput = {
    AND?: JobDescriptionWhereInput | JobDescriptionWhereInput[]
    OR?: JobDescriptionWhereInput[]
    NOT?: JobDescriptionWhereInput | JobDescriptionWhereInput[]
    id?: StringFilter<"JobDescription"> | string
    title?: StringFilter<"JobDescription"> | string
    description?: StringFilter<"JobDescription"> | string
    minExperience?: IntFilter<"JobDescription"> | number
    maxExperience?: IntFilter<"JobDescription"> | number
    languages?: StringNullableListFilter<"JobDescription">
    projectContext?: StringFilter<"JobDescription"> | string
    createdAt?: DateTimeFilter<"JobDescription"> | Date | string
    updatedAt?: DateTimeFilter<"JobDescription"> | Date | string
    creatorId?: StringFilter<"JobDescription"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    test?: XOR<TestNullableScalarRelationFilter, TestWhereInput> | null
    candidates?: CandidateListRelationFilter
  }

  export type JobDescriptionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    minExperience?: SortOrder
    maxExperience?: SortOrder
    languages?: SortOrder
    projectContext?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    creator?: UserOrderByWithRelationInput
    test?: TestOrderByWithRelationInput
    candidates?: CandidateOrderByRelationAggregateInput
  }

  export type JobDescriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobDescriptionWhereInput | JobDescriptionWhereInput[]
    OR?: JobDescriptionWhereInput[]
    NOT?: JobDescriptionWhereInput | JobDescriptionWhereInput[]
    title?: StringFilter<"JobDescription"> | string
    description?: StringFilter<"JobDescription"> | string
    minExperience?: IntFilter<"JobDescription"> | number
    maxExperience?: IntFilter<"JobDescription"> | number
    languages?: StringNullableListFilter<"JobDescription">
    projectContext?: StringFilter<"JobDescription"> | string
    createdAt?: DateTimeFilter<"JobDescription"> | Date | string
    updatedAt?: DateTimeFilter<"JobDescription"> | Date | string
    creatorId?: StringFilter<"JobDescription"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    test?: XOR<TestNullableScalarRelationFilter, TestWhereInput> | null
    candidates?: CandidateListRelationFilter
  }, "id">

  export type JobDescriptionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    minExperience?: SortOrder
    maxExperience?: SortOrder
    languages?: SortOrder
    projectContext?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    _count?: JobDescriptionCountOrderByAggregateInput
    _avg?: JobDescriptionAvgOrderByAggregateInput
    _max?: JobDescriptionMaxOrderByAggregateInput
    _min?: JobDescriptionMinOrderByAggregateInput
    _sum?: JobDescriptionSumOrderByAggregateInput
  }

  export type JobDescriptionScalarWhereWithAggregatesInput = {
    AND?: JobDescriptionScalarWhereWithAggregatesInput | JobDescriptionScalarWhereWithAggregatesInput[]
    OR?: JobDescriptionScalarWhereWithAggregatesInput[]
    NOT?: JobDescriptionScalarWhereWithAggregatesInput | JobDescriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobDescription"> | string
    title?: StringWithAggregatesFilter<"JobDescription"> | string
    description?: StringWithAggregatesFilter<"JobDescription"> | string
    minExperience?: IntWithAggregatesFilter<"JobDescription"> | number
    maxExperience?: IntWithAggregatesFilter<"JobDescription"> | number
    languages?: StringNullableListFilter<"JobDescription">
    projectContext?: StringWithAggregatesFilter<"JobDescription"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JobDescription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobDescription"> | Date | string
    creatorId?: StringWithAggregatesFilter<"JobDescription"> | string
  }

  export type CandidateWhereInput = {
    AND?: CandidateWhereInput | CandidateWhereInput[]
    OR?: CandidateWhereInput[]
    NOT?: CandidateWhereInput | CandidateWhereInput[]
    id?: StringFilter<"Candidate"> | string
    status?: StringFilter<"Candidate"> | string
    suitabilityScore?: FloatNullableFilter<"Candidate"> | number | null
    suitabilityAnalysis?: JsonNullableFilter<"Candidate">
    individualRepoUrl?: StringNullableFilter<"Candidate"> | string | null
    repoCreatedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    createdAt?: DateTimeFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeFilter<"Candidate"> | Date | string
    jobDescriptionId?: StringFilter<"Candidate"> | string
    resumeId?: StringFilter<"Candidate"> | string
    jobDescription?: XOR<JobDescriptionScalarRelationFilter, JobDescriptionWhereInput>
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
    submissionEvents?: SubmissionEventListRelationFilter
  }

  export type CandidateOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    suitabilityScore?: SortOrderInput | SortOrder
    suitabilityAnalysis?: SortOrderInput | SortOrder
    individualRepoUrl?: SortOrderInput | SortOrder
    repoCreatedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobDescriptionId?: SortOrder
    resumeId?: SortOrder
    jobDescription?: JobDescriptionOrderByWithRelationInput
    resume?: ResumeOrderByWithRelationInput
    submissionEvents?: SubmissionEventOrderByRelationAggregateInput
  }

  export type CandidateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jobDescriptionId_resumeId?: CandidateJobDescriptionIdResumeIdCompoundUniqueInput
    AND?: CandidateWhereInput | CandidateWhereInput[]
    OR?: CandidateWhereInput[]
    NOT?: CandidateWhereInput | CandidateWhereInput[]
    status?: StringFilter<"Candidate"> | string
    suitabilityScore?: FloatNullableFilter<"Candidate"> | number | null
    suitabilityAnalysis?: JsonNullableFilter<"Candidate">
    individualRepoUrl?: StringNullableFilter<"Candidate"> | string | null
    repoCreatedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    createdAt?: DateTimeFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeFilter<"Candidate"> | Date | string
    jobDescriptionId?: StringFilter<"Candidate"> | string
    resumeId?: StringFilter<"Candidate"> | string
    jobDescription?: XOR<JobDescriptionScalarRelationFilter, JobDescriptionWhereInput>
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
    submissionEvents?: SubmissionEventListRelationFilter
  }, "id" | "jobDescriptionId_resumeId">

  export type CandidateOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    suitabilityScore?: SortOrderInput | SortOrder
    suitabilityAnalysis?: SortOrderInput | SortOrder
    individualRepoUrl?: SortOrderInput | SortOrder
    repoCreatedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobDescriptionId?: SortOrder
    resumeId?: SortOrder
    _count?: CandidateCountOrderByAggregateInput
    _avg?: CandidateAvgOrderByAggregateInput
    _max?: CandidateMaxOrderByAggregateInput
    _min?: CandidateMinOrderByAggregateInput
    _sum?: CandidateSumOrderByAggregateInput
  }

  export type CandidateScalarWhereWithAggregatesInput = {
    AND?: CandidateScalarWhereWithAggregatesInput | CandidateScalarWhereWithAggregatesInput[]
    OR?: CandidateScalarWhereWithAggregatesInput[]
    NOT?: CandidateScalarWhereWithAggregatesInput | CandidateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Candidate"> | string
    status?: StringWithAggregatesFilter<"Candidate"> | string
    suitabilityScore?: FloatNullableWithAggregatesFilter<"Candidate"> | number | null
    suitabilityAnalysis?: JsonNullableWithAggregatesFilter<"Candidate">
    individualRepoUrl?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    repoCreatedAt?: DateTimeNullableWithAggregatesFilter<"Candidate"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Candidate"> | Date | string
    jobDescriptionId?: StringWithAggregatesFilter<"Candidate"> | string
    resumeId?: StringWithAggregatesFilter<"Candidate"> | string
  }

  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: StringFilter<"Resume"> | string
    email?: StringFilter<"Resume"> | string
    filename?: StringFilter<"Resume"> | string
    path?: StringFilter<"Resume"> | string
    size?: IntFilter<"Resume"> | number
    analysis?: JsonNullableFilter<"Resume">
    uploadedAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    candidates?: CandidateListRelationFilter
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    filename?: SortOrder
    path?: SortOrder
    size?: SortOrder
    analysis?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
    candidates?: CandidateOrderByRelationAggregateInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    email?: StringFilter<"Resume"> | string
    filename?: StringFilter<"Resume"> | string
    path?: StringFilter<"Resume"> | string
    size?: IntFilter<"Resume"> | number
    analysis?: JsonNullableFilter<"Resume">
    uploadedAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    candidates?: CandidateListRelationFilter
  }, "id">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    filename?: SortOrder
    path?: SortOrder
    size?: SortOrder
    analysis?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _avg?: ResumeAvgOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
    _sum?: ResumeSumOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resume"> | string
    email?: StringWithAggregatesFilter<"Resume"> | string
    filename?: StringWithAggregatesFilter<"Resume"> | string
    path?: StringWithAggregatesFilter<"Resume"> | string
    size?: IntWithAggregatesFilter<"Resume"> | number
    analysis?: JsonNullableWithAggregatesFilter<"Resume">
    uploadedAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
  }

  export type TestWhereInput = {
    AND?: TestWhereInput | TestWhereInput[]
    OR?: TestWhereInput[]
    NOT?: TestWhereInput | TestWhereInput[]
    id?: StringFilter<"Test"> | string
    title?: StringFilter<"Test"> | string
    description?: StringNullableFilter<"Test"> | string | null
    difficulty?: StringFilter<"Test"> | string
    gitRepoUrl?: StringNullableFilter<"Test"> | string | null
    language?: StringFilter<"Test"> | string
    requirements?: JsonFilter<"Test">
    createdAt?: DateTimeFilter<"Test"> | Date | string
    updatedAt?: DateTimeFilter<"Test"> | Date | string
    jobDescriptionId?: StringFilter<"Test"> | string
    repoArchived?: BoolFilter<"Test"> | boolean
    repoArchivedAt?: DateTimeNullableFilter<"Test"> | Date | string | null
    jobDescription?: XOR<JobDescriptionScalarRelationFilter, JobDescriptionWhereInput>
    testCases?: TestCaseListRelationFilter
    files?: TestFileListRelationFilter
    submissions?: SubmissionListRelationFilter
    submissionEvents?: SubmissionEventListRelationFilter
  }

  export type TestOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    gitRepoUrl?: SortOrderInput | SortOrder
    language?: SortOrder
    requirements?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobDescriptionId?: SortOrder
    repoArchived?: SortOrder
    repoArchivedAt?: SortOrderInput | SortOrder
    jobDescription?: JobDescriptionOrderByWithRelationInput
    testCases?: TestCaseOrderByRelationAggregateInput
    files?: TestFileOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
    submissionEvents?: SubmissionEventOrderByRelationAggregateInput
  }

  export type TestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jobDescriptionId?: string
    AND?: TestWhereInput | TestWhereInput[]
    OR?: TestWhereInput[]
    NOT?: TestWhereInput | TestWhereInput[]
    title?: StringFilter<"Test"> | string
    description?: StringNullableFilter<"Test"> | string | null
    difficulty?: StringFilter<"Test"> | string
    gitRepoUrl?: StringNullableFilter<"Test"> | string | null
    language?: StringFilter<"Test"> | string
    requirements?: JsonFilter<"Test">
    createdAt?: DateTimeFilter<"Test"> | Date | string
    updatedAt?: DateTimeFilter<"Test"> | Date | string
    repoArchived?: BoolFilter<"Test"> | boolean
    repoArchivedAt?: DateTimeNullableFilter<"Test"> | Date | string | null
    jobDescription?: XOR<JobDescriptionScalarRelationFilter, JobDescriptionWhereInput>
    testCases?: TestCaseListRelationFilter
    files?: TestFileListRelationFilter
    submissions?: SubmissionListRelationFilter
    submissionEvents?: SubmissionEventListRelationFilter
  }, "id" | "jobDescriptionId">

  export type TestOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    gitRepoUrl?: SortOrderInput | SortOrder
    language?: SortOrder
    requirements?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobDescriptionId?: SortOrder
    repoArchived?: SortOrder
    repoArchivedAt?: SortOrderInput | SortOrder
    _count?: TestCountOrderByAggregateInput
    _max?: TestMaxOrderByAggregateInput
    _min?: TestMinOrderByAggregateInput
  }

  export type TestScalarWhereWithAggregatesInput = {
    AND?: TestScalarWhereWithAggregatesInput | TestScalarWhereWithAggregatesInput[]
    OR?: TestScalarWhereWithAggregatesInput[]
    NOT?: TestScalarWhereWithAggregatesInput | TestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Test"> | string
    title?: StringWithAggregatesFilter<"Test"> | string
    description?: StringNullableWithAggregatesFilter<"Test"> | string | null
    difficulty?: StringWithAggregatesFilter<"Test"> | string
    gitRepoUrl?: StringNullableWithAggregatesFilter<"Test"> | string | null
    language?: StringWithAggregatesFilter<"Test"> | string
    requirements?: JsonWithAggregatesFilter<"Test">
    createdAt?: DateTimeWithAggregatesFilter<"Test"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Test"> | Date | string
    jobDescriptionId?: StringWithAggregatesFilter<"Test"> | string
    repoArchived?: BoolWithAggregatesFilter<"Test"> | boolean
    repoArchivedAt?: DateTimeNullableWithAggregatesFilter<"Test"> | Date | string | null
  }

  export type TestCaseWhereInput = {
    AND?: TestCaseWhereInput | TestCaseWhereInput[]
    OR?: TestCaseWhereInput[]
    NOT?: TestCaseWhereInput | TestCaseWhereInput[]
    id?: StringFilter<"TestCase"> | string
    description?: StringFilter<"TestCase"> | string
    input?: StringNullableFilter<"TestCase"> | string | null
    expectedOutput?: StringFilter<"TestCase"> | string
    category?: StringNullableFilter<"TestCase"> | string | null
    difficulty?: StringNullableFilter<"TestCase"> | string | null
    points?: IntNullableFilter<"TestCase"> | number | null
    verificationMethod?: StringNullableFilter<"TestCase"> | string | null
    testId?: StringFilter<"TestCase"> | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }

  export type TestCaseOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    input?: SortOrderInput | SortOrder
    expectedOutput?: SortOrder
    category?: SortOrderInput | SortOrder
    difficulty?: SortOrderInput | SortOrder
    points?: SortOrderInput | SortOrder
    verificationMethod?: SortOrderInput | SortOrder
    testId?: SortOrder
    test?: TestOrderByWithRelationInput
  }

  export type TestCaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestCaseWhereInput | TestCaseWhereInput[]
    OR?: TestCaseWhereInput[]
    NOT?: TestCaseWhereInput | TestCaseWhereInput[]
    description?: StringFilter<"TestCase"> | string
    input?: StringNullableFilter<"TestCase"> | string | null
    expectedOutput?: StringFilter<"TestCase"> | string
    category?: StringNullableFilter<"TestCase"> | string | null
    difficulty?: StringNullableFilter<"TestCase"> | string | null
    points?: IntNullableFilter<"TestCase"> | number | null
    verificationMethod?: StringNullableFilter<"TestCase"> | string | null
    testId?: StringFilter<"TestCase"> | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }, "id">

  export type TestCaseOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    input?: SortOrderInput | SortOrder
    expectedOutput?: SortOrder
    category?: SortOrderInput | SortOrder
    difficulty?: SortOrderInput | SortOrder
    points?: SortOrderInput | SortOrder
    verificationMethod?: SortOrderInput | SortOrder
    testId?: SortOrder
    _count?: TestCaseCountOrderByAggregateInput
    _avg?: TestCaseAvgOrderByAggregateInput
    _max?: TestCaseMaxOrderByAggregateInput
    _min?: TestCaseMinOrderByAggregateInput
    _sum?: TestCaseSumOrderByAggregateInput
  }

  export type TestCaseScalarWhereWithAggregatesInput = {
    AND?: TestCaseScalarWhereWithAggregatesInput | TestCaseScalarWhereWithAggregatesInput[]
    OR?: TestCaseScalarWhereWithAggregatesInput[]
    NOT?: TestCaseScalarWhereWithAggregatesInput | TestCaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestCase"> | string
    description?: StringWithAggregatesFilter<"TestCase"> | string
    input?: StringNullableWithAggregatesFilter<"TestCase"> | string | null
    expectedOutput?: StringWithAggregatesFilter<"TestCase"> | string
    category?: StringNullableWithAggregatesFilter<"TestCase"> | string | null
    difficulty?: StringNullableWithAggregatesFilter<"TestCase"> | string | null
    points?: IntNullableWithAggregatesFilter<"TestCase"> | number | null
    verificationMethod?: StringNullableWithAggregatesFilter<"TestCase"> | string | null
    testId?: StringWithAggregatesFilter<"TestCase"> | string
  }

  export type TestFileWhereInput = {
    AND?: TestFileWhereInput | TestFileWhereInput[]
    OR?: TestFileWhereInput[]
    NOT?: TestFileWhereInput | TestFileWhereInput[]
    id?: StringFilter<"TestFile"> | string
    path?: StringFilter<"TestFile"> | string
    content?: StringFilter<"TestFile"> | string
    testId?: StringFilter<"TestFile"> | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }

  export type TestFileOrderByWithRelationInput = {
    id?: SortOrder
    path?: SortOrder
    content?: SortOrder
    testId?: SortOrder
    test?: TestOrderByWithRelationInput
  }

  export type TestFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestFileWhereInput | TestFileWhereInput[]
    OR?: TestFileWhereInput[]
    NOT?: TestFileWhereInput | TestFileWhereInput[]
    path?: StringFilter<"TestFile"> | string
    content?: StringFilter<"TestFile"> | string
    testId?: StringFilter<"TestFile"> | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }, "id">

  export type TestFileOrderByWithAggregationInput = {
    id?: SortOrder
    path?: SortOrder
    content?: SortOrder
    testId?: SortOrder
    _count?: TestFileCountOrderByAggregateInput
    _max?: TestFileMaxOrderByAggregateInput
    _min?: TestFileMinOrderByAggregateInput
  }

  export type TestFileScalarWhereWithAggregatesInput = {
    AND?: TestFileScalarWhereWithAggregatesInput | TestFileScalarWhereWithAggregatesInput[]
    OR?: TestFileScalarWhereWithAggregatesInput[]
    NOT?: TestFileScalarWhereWithAggregatesInput | TestFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestFile"> | string
    path?: StringWithAggregatesFilter<"TestFile"> | string
    content?: StringWithAggregatesFilter<"TestFile"> | string
    testId?: StringWithAggregatesFilter<"TestFile"> | string
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: StringFilter<"Submission"> | string
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    status?: StringFilter<"Submission"> | string
    result?: JsonNullableFilter<"Submission">
    feedback?: JsonNullableFilter<"Submission">
    testId?: StringFilter<"Submission"> | string
    userId?: StringNullableFilter<"Submission"> | string | null
    aiScore?: FloatNullableFilter<"Submission"> | number | null
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    result?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    testId?: SortOrder
    userId?: SortOrderInput | SortOrder
    aiScore?: SortOrderInput | SortOrder
    test?: TestOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type SubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    status?: StringFilter<"Submission"> | string
    result?: JsonNullableFilter<"Submission">
    feedback?: JsonNullableFilter<"Submission">
    testId?: StringFilter<"Submission"> | string
    userId?: StringNullableFilter<"Submission"> | string | null
    aiScore?: FloatNullableFilter<"Submission"> | number | null
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    result?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    testId?: SortOrder
    userId?: SortOrderInput | SortOrder
    aiScore?: SortOrderInput | SortOrder
    _count?: SubmissionCountOrderByAggregateInput
    _avg?: SubmissionAvgOrderByAggregateInput
    _max?: SubmissionMaxOrderByAggregateInput
    _min?: SubmissionMinOrderByAggregateInput
    _sum?: SubmissionSumOrderByAggregateInput
  }

  export type SubmissionScalarWhereWithAggregatesInput = {
    AND?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    OR?: SubmissionScalarWhereWithAggregatesInput[]
    NOT?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Submission"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    status?: StringWithAggregatesFilter<"Submission"> | string
    result?: JsonNullableWithAggregatesFilter<"Submission">
    feedback?: JsonNullableWithAggregatesFilter<"Submission">
    testId?: StringWithAggregatesFilter<"Submission"> | string
    userId?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    aiScore?: FloatNullableWithAggregatesFilter<"Submission"> | number | null
  }

  export type SubmissionEventWhereInput = {
    AND?: SubmissionEventWhereInput | SubmissionEventWhereInput[]
    OR?: SubmissionEventWhereInput[]
    NOT?: SubmissionEventWhereInput | SubmissionEventWhereInput[]
    id?: StringFilter<"SubmissionEvent"> | string
    repoName?: StringFilter<"SubmissionEvent"> | string
    commitSha?: StringFilter<"SubmissionEvent"> | string
    branch?: StringFilter<"SubmissionEvent"> | string
    pusher?: StringFilter<"SubmissionEvent"> | string
    eventType?: StringFilter<"SubmissionEvent"> | string
    receivedAt?: DateTimeFilter<"SubmissionEvent"> | Date | string
    candidateId?: StringNullableFilter<"SubmissionEvent"> | string | null
    testId?: StringNullableFilter<"SubmissionEvent"> | string | null
    candidate?: XOR<CandidateNullableScalarRelationFilter, CandidateWhereInput> | null
    test?: XOR<TestNullableScalarRelationFilter, TestWhereInput> | null
  }

  export type SubmissionEventOrderByWithRelationInput = {
    id?: SortOrder
    repoName?: SortOrder
    commitSha?: SortOrder
    branch?: SortOrder
    pusher?: SortOrder
    eventType?: SortOrder
    receivedAt?: SortOrder
    candidateId?: SortOrderInput | SortOrder
    testId?: SortOrderInput | SortOrder
    candidate?: CandidateOrderByWithRelationInput
    test?: TestOrderByWithRelationInput
  }

  export type SubmissionEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubmissionEventWhereInput | SubmissionEventWhereInput[]
    OR?: SubmissionEventWhereInput[]
    NOT?: SubmissionEventWhereInput | SubmissionEventWhereInput[]
    repoName?: StringFilter<"SubmissionEvent"> | string
    commitSha?: StringFilter<"SubmissionEvent"> | string
    branch?: StringFilter<"SubmissionEvent"> | string
    pusher?: StringFilter<"SubmissionEvent"> | string
    eventType?: StringFilter<"SubmissionEvent"> | string
    receivedAt?: DateTimeFilter<"SubmissionEvent"> | Date | string
    candidateId?: StringNullableFilter<"SubmissionEvent"> | string | null
    testId?: StringNullableFilter<"SubmissionEvent"> | string | null
    candidate?: XOR<CandidateNullableScalarRelationFilter, CandidateWhereInput> | null
    test?: XOR<TestNullableScalarRelationFilter, TestWhereInput> | null
  }, "id">

  export type SubmissionEventOrderByWithAggregationInput = {
    id?: SortOrder
    repoName?: SortOrder
    commitSha?: SortOrder
    branch?: SortOrder
    pusher?: SortOrder
    eventType?: SortOrder
    receivedAt?: SortOrder
    candidateId?: SortOrderInput | SortOrder
    testId?: SortOrderInput | SortOrder
    _count?: SubmissionEventCountOrderByAggregateInput
    _max?: SubmissionEventMaxOrderByAggregateInput
    _min?: SubmissionEventMinOrderByAggregateInput
  }

  export type SubmissionEventScalarWhereWithAggregatesInput = {
    AND?: SubmissionEventScalarWhereWithAggregatesInput | SubmissionEventScalarWhereWithAggregatesInput[]
    OR?: SubmissionEventScalarWhereWithAggregatesInput[]
    NOT?: SubmissionEventScalarWhereWithAggregatesInput | SubmissionEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SubmissionEvent"> | string
    repoName?: StringWithAggregatesFilter<"SubmissionEvent"> | string
    commitSha?: StringWithAggregatesFilter<"SubmissionEvent"> | string
    branch?: StringWithAggregatesFilter<"SubmissionEvent"> | string
    pusher?: StringWithAggregatesFilter<"SubmissionEvent"> | string
    eventType?: StringWithAggregatesFilter<"SubmissionEvent"> | string
    receivedAt?: DateTimeWithAggregatesFilter<"SubmissionEvent"> | Date | string
    candidateId?: StringNullableWithAggregatesFilter<"SubmissionEvent"> | string | null
    testId?: StringNullableWithAggregatesFilter<"SubmissionEvent"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUsersInput
    jobDescriptions?: JobDescriptionCreateNestedManyWithoutCreatorInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    companyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptions?: JobDescriptionUncheckedCreateNestedManyWithoutCreatorInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUsersNestedInput
    jobDescriptions?: JobDescriptionUpdateManyWithoutCreatorNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptions?: JobDescriptionUncheckedUpdateManyWithoutCreatorNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    companyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    users?: UserCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    name: string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    name: string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type JobDescriptionCreateInput = {
    id?: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages?: JobDescriptionCreatelanguagesInput | string[]
    projectContext: string
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutJobDescriptionsInput
    test?: TestCreateNestedOneWithoutJobDescriptionInput
    candidates?: CandidateCreateNestedManyWithoutJobDescriptionInput
  }

  export type JobDescriptionUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages?: JobDescriptionCreatelanguagesInput | string[]
    projectContext: string
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    test?: TestUncheckedCreateNestedOneWithoutJobDescriptionInput
    candidates?: CandidateUncheckedCreateNestedManyWithoutJobDescriptionInput
  }

  export type JobDescriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutJobDescriptionsNestedInput
    test?: TestUpdateOneWithoutJobDescriptionNestedInput
    candidates?: CandidateUpdateManyWithoutJobDescriptionNestedInput
  }

  export type JobDescriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    test?: TestUncheckedUpdateOneWithoutJobDescriptionNestedInput
    candidates?: CandidateUncheckedUpdateManyWithoutJobDescriptionNestedInput
  }

  export type JobDescriptionCreateManyInput = {
    id?: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages?: JobDescriptionCreatelanguagesInput | string[]
    projectContext: string
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type JobDescriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobDescriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type CandidateCreateInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescription: JobDescriptionCreateNestedOneWithoutCandidatesInput
    resume: ResumeCreateNestedOneWithoutCandidatesInput
    submissionEvents?: SubmissionEventCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
    resumeId: string
    submissionEvents?: SubmissionEventUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescription?: JobDescriptionUpdateOneRequiredWithoutCandidatesNestedInput
    resume?: ResumeUpdateOneRequiredWithoutCandidatesNestedInput
    submissionEvents?: SubmissionEventUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
    submissionEvents?: SubmissionEventUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateCreateManyInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
    resumeId: string
  }

  export type CandidateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
  }

  export type ResumeCreateInput = {
    id?: string
    email: string
    filename: string
    path: string
    size: number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: Date | string
    updatedAt?: Date | string
    candidates?: CandidateCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: string
    email: string
    filename: string
    path: string
    size: number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: Date | string
    updatedAt?: Date | string
    candidates?: CandidateUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeCreateManyInput = {
    id?: string
    email: string
    filename: string
    path: string
    size: number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCreateInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    jobDescription: JobDescriptionCreateNestedOneWithoutTestInput
    testCases?: TestCaseCreateNestedManyWithoutTestInput
    files?: TestFileCreateNestedManyWithoutTestInput
    submissions?: SubmissionCreateNestedManyWithoutTestInput
    submissionEvents?: SubmissionEventCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    testCases?: TestCaseUncheckedCreateNestedManyWithoutTestInput
    files?: TestFileUncheckedCreateNestedManyWithoutTestInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutTestInput
    submissionEvents?: SubmissionEventUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobDescription?: JobDescriptionUpdateOneRequiredWithoutTestNestedInput
    testCases?: TestCaseUpdateManyWithoutTestNestedInput
    files?: TestFileUpdateManyWithoutTestNestedInput
    submissions?: SubmissionUpdateManyWithoutTestNestedInput
    submissionEvents?: SubmissionEventUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testCases?: TestCaseUncheckedUpdateManyWithoutTestNestedInput
    files?: TestFileUncheckedUpdateManyWithoutTestNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutTestNestedInput
    submissionEvents?: SubmissionEventUncheckedUpdateManyWithoutTestNestedInput
  }

  export type TestCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
  }

  export type TestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TestCaseCreateInput = {
    id?: string
    description: string
    input?: string | null
    expectedOutput: string
    category?: string | null
    difficulty?: string | null
    points?: number | null
    verificationMethod?: string | null
    test: TestCreateNestedOneWithoutTestCasesInput
  }

  export type TestCaseUncheckedCreateInput = {
    id?: string
    description: string
    input?: string | null
    expectedOutput: string
    category?: string | null
    difficulty?: string | null
    points?: number | null
    verificationMethod?: string | null
    testId: string
  }

  export type TestCaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
    test?: TestUpdateOneRequiredWithoutTestCasesNestedInput
  }

  export type TestCaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
    testId?: StringFieldUpdateOperationsInput | string
  }

  export type TestCaseCreateManyInput = {
    id?: string
    description: string
    input?: string | null
    expectedOutput: string
    category?: string | null
    difficulty?: string | null
    points?: number | null
    verificationMethod?: string | null
    testId: string
  }

  export type TestCaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TestCaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
    testId?: StringFieldUpdateOperationsInput | string
  }

  export type TestFileCreateInput = {
    id?: string
    path: string
    content: string
    test: TestCreateNestedOneWithoutFilesInput
  }

  export type TestFileUncheckedCreateInput = {
    id?: string
    path: string
    content: string
    testId: string
  }

  export type TestFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    test?: TestUpdateOneRequiredWithoutFilesNestedInput
  }

  export type TestFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
  }

  export type TestFileCreateManyInput = {
    id?: string
    path: string
    content: string
    testId: string
  }

  export type TestFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type TestFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
  }

  export type SubmissionCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    aiScore?: number | null
    test: TestCreateNestedOneWithoutSubmissionsInput
    user?: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    testId: string
    userId?: string | null
    aiScore?: number | null
  }

  export type SubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
    test?: TestUpdateOneRequiredWithoutSubmissionsNestedInput
    user?: UserUpdateOneWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    testId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type SubmissionCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    testId: string
    userId?: string | null
    aiScore?: number | null
  }

  export type SubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type SubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    testId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type SubmissionEventCreateInput = {
    id?: string
    repoName: string
    commitSha: string
    branch: string
    pusher: string
    eventType: string
    receivedAt?: Date | string
    candidate?: CandidateCreateNestedOneWithoutSubmissionEventsInput
    test?: TestCreateNestedOneWithoutSubmissionEventsInput
  }

  export type SubmissionEventUncheckedCreateInput = {
    id?: string
    repoName: string
    commitSha: string
    branch: string
    pusher: string
    eventType: string
    receivedAt?: Date | string
    candidateId?: string | null
    testId?: string | null
  }

  export type SubmissionEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    pusher?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneWithoutSubmissionEventsNestedInput
    test?: TestUpdateOneWithoutSubmissionEventsNestedInput
  }

  export type SubmissionEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    pusher?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateId?: NullableStringFieldUpdateOperationsInput | string | null
    testId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubmissionEventCreateManyInput = {
    id?: string
    repoName: string
    commitSha: string
    branch: string
    pusher: string
    eventType: string
    receivedAt?: Date | string
    candidateId?: string | null
    testId?: string | null
  }

  export type SubmissionEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    pusher?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    pusher?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateId?: NullableStringFieldUpdateOperationsInput | string | null
    testId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CompanyNullableScalarRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type JobDescriptionListRelationFilter = {
    every?: JobDescriptionWhereInput
    some?: JobDescriptionWhereInput
    none?: JobDescriptionWhereInput
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type JobDescriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TestNullableScalarRelationFilter = {
    is?: TestWhereInput | null
    isNot?: TestWhereInput | null
  }

  export type CandidateListRelationFilter = {
    every?: CandidateWhereInput
    some?: CandidateWhereInput
    none?: CandidateWhereInput
  }

  export type CandidateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobDescriptionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    minExperience?: SortOrder
    maxExperience?: SortOrder
    languages?: SortOrder
    projectContext?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type JobDescriptionAvgOrderByAggregateInput = {
    minExperience?: SortOrder
    maxExperience?: SortOrder
  }

  export type JobDescriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    minExperience?: SortOrder
    maxExperience?: SortOrder
    projectContext?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type JobDescriptionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    minExperience?: SortOrder
    maxExperience?: SortOrder
    projectContext?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type JobDescriptionSumOrderByAggregateInput = {
    minExperience?: SortOrder
    maxExperience?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type JobDescriptionScalarRelationFilter = {
    is?: JobDescriptionWhereInput
    isNot?: JobDescriptionWhereInput
  }

  export type ResumeScalarRelationFilter = {
    is?: ResumeWhereInput
    isNot?: ResumeWhereInput
  }

  export type SubmissionEventListRelationFilter = {
    every?: SubmissionEventWhereInput
    some?: SubmissionEventWhereInput
    none?: SubmissionEventWhereInput
  }

  export type SubmissionEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CandidateJobDescriptionIdResumeIdCompoundUniqueInput = {
    jobDescriptionId: string
    resumeId: string
  }

  export type CandidateCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    suitabilityScore?: SortOrder
    suitabilityAnalysis?: SortOrder
    individualRepoUrl?: SortOrder
    repoCreatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobDescriptionId?: SortOrder
    resumeId?: SortOrder
  }

  export type CandidateAvgOrderByAggregateInput = {
    suitabilityScore?: SortOrder
  }

  export type CandidateMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    suitabilityScore?: SortOrder
    individualRepoUrl?: SortOrder
    repoCreatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobDescriptionId?: SortOrder
    resumeId?: SortOrder
  }

  export type CandidateMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    suitabilityScore?: SortOrder
    individualRepoUrl?: SortOrder
    repoCreatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobDescriptionId?: SortOrder
    resumeId?: SortOrder
  }

  export type CandidateSumOrderByAggregateInput = {
    suitabilityScore?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    filename?: SortOrder
    path?: SortOrder
    size?: SortOrder
    analysis?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    filename?: SortOrder
    path?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    filename?: SortOrder
    path?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeSumOrderByAggregateInput = {
    size?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TestCaseListRelationFilter = {
    every?: TestCaseWhereInput
    some?: TestCaseWhereInput
    none?: TestCaseWhereInput
  }

  export type TestFileListRelationFilter = {
    every?: TestFileWhereInput
    some?: TestFileWhereInput
    none?: TestFileWhereInput
  }

  export type TestCaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    gitRepoUrl?: SortOrder
    language?: SortOrder
    requirements?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobDescriptionId?: SortOrder
    repoArchived?: SortOrder
    repoArchivedAt?: SortOrder
  }

  export type TestMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    gitRepoUrl?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobDescriptionId?: SortOrder
    repoArchived?: SortOrder
    repoArchivedAt?: SortOrder
  }

  export type TestMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    gitRepoUrl?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobDescriptionId?: SortOrder
    repoArchived?: SortOrder
    repoArchivedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TestScalarRelationFilter = {
    is?: TestWhereInput
    isNot?: TestWhereInput
  }

  export type TestCaseCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    input?: SortOrder
    expectedOutput?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    points?: SortOrder
    verificationMethod?: SortOrder
    testId?: SortOrder
  }

  export type TestCaseAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type TestCaseMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    input?: SortOrder
    expectedOutput?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    points?: SortOrder
    verificationMethod?: SortOrder
    testId?: SortOrder
  }

  export type TestCaseMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    input?: SortOrder
    expectedOutput?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    points?: SortOrder
    verificationMethod?: SortOrder
    testId?: SortOrder
  }

  export type TestCaseSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TestFileCountOrderByAggregateInput = {
    id?: SortOrder
    path?: SortOrder
    content?: SortOrder
    testId?: SortOrder
  }

  export type TestFileMaxOrderByAggregateInput = {
    id?: SortOrder
    path?: SortOrder
    content?: SortOrder
    testId?: SortOrder
  }

  export type TestFileMinOrderByAggregateInput = {
    id?: SortOrder
    path?: SortOrder
    content?: SortOrder
    testId?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    result?: SortOrder
    feedback?: SortOrder
    testId?: SortOrder
    userId?: SortOrder
    aiScore?: SortOrder
  }

  export type SubmissionAvgOrderByAggregateInput = {
    aiScore?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    testId?: SortOrder
    userId?: SortOrder
    aiScore?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    testId?: SortOrder
    userId?: SortOrder
    aiScore?: SortOrder
  }

  export type SubmissionSumOrderByAggregateInput = {
    aiScore?: SortOrder
  }

  export type CandidateNullableScalarRelationFilter = {
    is?: CandidateWhereInput | null
    isNot?: CandidateWhereInput | null
  }

  export type SubmissionEventCountOrderByAggregateInput = {
    id?: SortOrder
    repoName?: SortOrder
    commitSha?: SortOrder
    branch?: SortOrder
    pusher?: SortOrder
    eventType?: SortOrder
    receivedAt?: SortOrder
    candidateId?: SortOrder
    testId?: SortOrder
  }

  export type SubmissionEventMaxOrderByAggregateInput = {
    id?: SortOrder
    repoName?: SortOrder
    commitSha?: SortOrder
    branch?: SortOrder
    pusher?: SortOrder
    eventType?: SortOrder
    receivedAt?: SortOrder
    candidateId?: SortOrder
    testId?: SortOrder
  }

  export type SubmissionEventMinOrderByAggregateInput = {
    id?: SortOrder
    repoName?: SortOrder
    commitSha?: SortOrder
    branch?: SortOrder
    pusher?: SortOrder
    eventType?: SortOrder
    receivedAt?: SortOrder
    candidateId?: SortOrder
    testId?: SortOrder
  }

  export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    connect?: CompanyWhereUniqueInput
  }

  export type JobDescriptionCreateNestedManyWithoutCreatorInput = {
    create?: XOR<JobDescriptionCreateWithoutCreatorInput, JobDescriptionUncheckedCreateWithoutCreatorInput> | JobDescriptionCreateWithoutCreatorInput[] | JobDescriptionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: JobDescriptionCreateOrConnectWithoutCreatorInput | JobDescriptionCreateOrConnectWithoutCreatorInput[]
    createMany?: JobDescriptionCreateManyCreatorInputEnvelope
    connect?: JobDescriptionWhereUniqueInput | JobDescriptionWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutUserInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type JobDescriptionUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<JobDescriptionCreateWithoutCreatorInput, JobDescriptionUncheckedCreateWithoutCreatorInput> | JobDescriptionCreateWithoutCreatorInput[] | JobDescriptionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: JobDescriptionCreateOrConnectWithoutCreatorInput | JobDescriptionCreateOrConnectWithoutCreatorInput[]
    createMany?: JobDescriptionCreateManyCreatorInputEnvelope
    connect?: JobDescriptionWhereUniqueInput | JobDescriptionWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CompanyUpdateOneWithoutUsersNestedInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    upsert?: CompanyUpsertWithoutUsersInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUsersInput, CompanyUpdateWithoutUsersInput>, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type JobDescriptionUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<JobDescriptionCreateWithoutCreatorInput, JobDescriptionUncheckedCreateWithoutCreatorInput> | JobDescriptionCreateWithoutCreatorInput[] | JobDescriptionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: JobDescriptionCreateOrConnectWithoutCreatorInput | JobDescriptionCreateOrConnectWithoutCreatorInput[]
    upsert?: JobDescriptionUpsertWithWhereUniqueWithoutCreatorInput | JobDescriptionUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: JobDescriptionCreateManyCreatorInputEnvelope
    set?: JobDescriptionWhereUniqueInput | JobDescriptionWhereUniqueInput[]
    disconnect?: JobDescriptionWhereUniqueInput | JobDescriptionWhereUniqueInput[]
    delete?: JobDescriptionWhereUniqueInput | JobDescriptionWhereUniqueInput[]
    connect?: JobDescriptionWhereUniqueInput | JobDescriptionWhereUniqueInput[]
    update?: JobDescriptionUpdateWithWhereUniqueWithoutCreatorInput | JobDescriptionUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: JobDescriptionUpdateManyWithWhereWithoutCreatorInput | JobDescriptionUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: JobDescriptionScalarWhereInput | JobDescriptionScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutUserInput | SubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutUserInput | SubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutUserInput | SubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type JobDescriptionUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<JobDescriptionCreateWithoutCreatorInput, JobDescriptionUncheckedCreateWithoutCreatorInput> | JobDescriptionCreateWithoutCreatorInput[] | JobDescriptionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: JobDescriptionCreateOrConnectWithoutCreatorInput | JobDescriptionCreateOrConnectWithoutCreatorInput[]
    upsert?: JobDescriptionUpsertWithWhereUniqueWithoutCreatorInput | JobDescriptionUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: JobDescriptionCreateManyCreatorInputEnvelope
    set?: JobDescriptionWhereUniqueInput | JobDescriptionWhereUniqueInput[]
    disconnect?: JobDescriptionWhereUniqueInput | JobDescriptionWhereUniqueInput[]
    delete?: JobDescriptionWhereUniqueInput | JobDescriptionWhereUniqueInput[]
    connect?: JobDescriptionWhereUniqueInput | JobDescriptionWhereUniqueInput[]
    update?: JobDescriptionUpdateWithWhereUniqueWithoutCreatorInput | JobDescriptionUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: JobDescriptionUpdateManyWithWhereWithoutCreatorInput | JobDescriptionUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: JobDescriptionScalarWhereInput | JobDescriptionScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutUserInput | SubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutUserInput | SubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutUserInput | SubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type JobDescriptionCreatelanguagesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutJobDescriptionsInput = {
    create?: XOR<UserCreateWithoutJobDescriptionsInput, UserUncheckedCreateWithoutJobDescriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobDescriptionsInput
    connect?: UserWhereUniqueInput
  }

  export type TestCreateNestedOneWithoutJobDescriptionInput = {
    create?: XOR<TestCreateWithoutJobDescriptionInput, TestUncheckedCreateWithoutJobDescriptionInput>
    connectOrCreate?: TestCreateOrConnectWithoutJobDescriptionInput
    connect?: TestWhereUniqueInput
  }

  export type CandidateCreateNestedManyWithoutJobDescriptionInput = {
    create?: XOR<CandidateCreateWithoutJobDescriptionInput, CandidateUncheckedCreateWithoutJobDescriptionInput> | CandidateCreateWithoutJobDescriptionInput[] | CandidateUncheckedCreateWithoutJobDescriptionInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutJobDescriptionInput | CandidateCreateOrConnectWithoutJobDescriptionInput[]
    createMany?: CandidateCreateManyJobDescriptionInputEnvelope
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
  }

  export type TestUncheckedCreateNestedOneWithoutJobDescriptionInput = {
    create?: XOR<TestCreateWithoutJobDescriptionInput, TestUncheckedCreateWithoutJobDescriptionInput>
    connectOrCreate?: TestCreateOrConnectWithoutJobDescriptionInput
    connect?: TestWhereUniqueInput
  }

  export type CandidateUncheckedCreateNestedManyWithoutJobDescriptionInput = {
    create?: XOR<CandidateCreateWithoutJobDescriptionInput, CandidateUncheckedCreateWithoutJobDescriptionInput> | CandidateCreateWithoutJobDescriptionInput[] | CandidateUncheckedCreateWithoutJobDescriptionInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutJobDescriptionInput | CandidateCreateOrConnectWithoutJobDescriptionInput[]
    createMany?: CandidateCreateManyJobDescriptionInputEnvelope
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobDescriptionUpdatelanguagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutJobDescriptionsNestedInput = {
    create?: XOR<UserCreateWithoutJobDescriptionsInput, UserUncheckedCreateWithoutJobDescriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobDescriptionsInput
    upsert?: UserUpsertWithoutJobDescriptionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJobDescriptionsInput, UserUpdateWithoutJobDescriptionsInput>, UserUncheckedUpdateWithoutJobDescriptionsInput>
  }

  export type TestUpdateOneWithoutJobDescriptionNestedInput = {
    create?: XOR<TestCreateWithoutJobDescriptionInput, TestUncheckedCreateWithoutJobDescriptionInput>
    connectOrCreate?: TestCreateOrConnectWithoutJobDescriptionInput
    upsert?: TestUpsertWithoutJobDescriptionInput
    disconnect?: TestWhereInput | boolean
    delete?: TestWhereInput | boolean
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutJobDescriptionInput, TestUpdateWithoutJobDescriptionInput>, TestUncheckedUpdateWithoutJobDescriptionInput>
  }

  export type CandidateUpdateManyWithoutJobDescriptionNestedInput = {
    create?: XOR<CandidateCreateWithoutJobDescriptionInput, CandidateUncheckedCreateWithoutJobDescriptionInput> | CandidateCreateWithoutJobDescriptionInput[] | CandidateUncheckedCreateWithoutJobDescriptionInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutJobDescriptionInput | CandidateCreateOrConnectWithoutJobDescriptionInput[]
    upsert?: CandidateUpsertWithWhereUniqueWithoutJobDescriptionInput | CandidateUpsertWithWhereUniqueWithoutJobDescriptionInput[]
    createMany?: CandidateCreateManyJobDescriptionInputEnvelope
    set?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    disconnect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    delete?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    update?: CandidateUpdateWithWhereUniqueWithoutJobDescriptionInput | CandidateUpdateWithWhereUniqueWithoutJobDescriptionInput[]
    updateMany?: CandidateUpdateManyWithWhereWithoutJobDescriptionInput | CandidateUpdateManyWithWhereWithoutJobDescriptionInput[]
    deleteMany?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
  }

  export type TestUncheckedUpdateOneWithoutJobDescriptionNestedInput = {
    create?: XOR<TestCreateWithoutJobDescriptionInput, TestUncheckedCreateWithoutJobDescriptionInput>
    connectOrCreate?: TestCreateOrConnectWithoutJobDescriptionInput
    upsert?: TestUpsertWithoutJobDescriptionInput
    disconnect?: TestWhereInput | boolean
    delete?: TestWhereInput | boolean
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutJobDescriptionInput, TestUpdateWithoutJobDescriptionInput>, TestUncheckedUpdateWithoutJobDescriptionInput>
  }

  export type CandidateUncheckedUpdateManyWithoutJobDescriptionNestedInput = {
    create?: XOR<CandidateCreateWithoutJobDescriptionInput, CandidateUncheckedCreateWithoutJobDescriptionInput> | CandidateCreateWithoutJobDescriptionInput[] | CandidateUncheckedCreateWithoutJobDescriptionInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutJobDescriptionInput | CandidateCreateOrConnectWithoutJobDescriptionInput[]
    upsert?: CandidateUpsertWithWhereUniqueWithoutJobDescriptionInput | CandidateUpsertWithWhereUniqueWithoutJobDescriptionInput[]
    createMany?: CandidateCreateManyJobDescriptionInputEnvelope
    set?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    disconnect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    delete?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    update?: CandidateUpdateWithWhereUniqueWithoutJobDescriptionInput | CandidateUpdateWithWhereUniqueWithoutJobDescriptionInput[]
    updateMany?: CandidateUpdateManyWithWhereWithoutJobDescriptionInput | CandidateUpdateManyWithWhereWithoutJobDescriptionInput[]
    deleteMany?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
  }

  export type JobDescriptionCreateNestedOneWithoutCandidatesInput = {
    create?: XOR<JobDescriptionCreateWithoutCandidatesInput, JobDescriptionUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: JobDescriptionCreateOrConnectWithoutCandidatesInput
    connect?: JobDescriptionWhereUniqueInput
  }

  export type ResumeCreateNestedOneWithoutCandidatesInput = {
    create?: XOR<ResumeCreateWithoutCandidatesInput, ResumeUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutCandidatesInput
    connect?: ResumeWhereUniqueInput
  }

  export type SubmissionEventCreateNestedManyWithoutCandidateInput = {
    create?: XOR<SubmissionEventCreateWithoutCandidateInput, SubmissionEventUncheckedCreateWithoutCandidateInput> | SubmissionEventCreateWithoutCandidateInput[] | SubmissionEventUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: SubmissionEventCreateOrConnectWithoutCandidateInput | SubmissionEventCreateOrConnectWithoutCandidateInput[]
    createMany?: SubmissionEventCreateManyCandidateInputEnvelope
    connect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
  }

  export type SubmissionEventUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<SubmissionEventCreateWithoutCandidateInput, SubmissionEventUncheckedCreateWithoutCandidateInput> | SubmissionEventCreateWithoutCandidateInput[] | SubmissionEventUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: SubmissionEventCreateOrConnectWithoutCandidateInput | SubmissionEventCreateOrConnectWithoutCandidateInput[]
    createMany?: SubmissionEventCreateManyCandidateInputEnvelope
    connect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type JobDescriptionUpdateOneRequiredWithoutCandidatesNestedInput = {
    create?: XOR<JobDescriptionCreateWithoutCandidatesInput, JobDescriptionUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: JobDescriptionCreateOrConnectWithoutCandidatesInput
    upsert?: JobDescriptionUpsertWithoutCandidatesInput
    connect?: JobDescriptionWhereUniqueInput
    update?: XOR<XOR<JobDescriptionUpdateToOneWithWhereWithoutCandidatesInput, JobDescriptionUpdateWithoutCandidatesInput>, JobDescriptionUncheckedUpdateWithoutCandidatesInput>
  }

  export type ResumeUpdateOneRequiredWithoutCandidatesNestedInput = {
    create?: XOR<ResumeCreateWithoutCandidatesInput, ResumeUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutCandidatesInput
    upsert?: ResumeUpsertWithoutCandidatesInput
    connect?: ResumeWhereUniqueInput
    update?: XOR<XOR<ResumeUpdateToOneWithWhereWithoutCandidatesInput, ResumeUpdateWithoutCandidatesInput>, ResumeUncheckedUpdateWithoutCandidatesInput>
  }

  export type SubmissionEventUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<SubmissionEventCreateWithoutCandidateInput, SubmissionEventUncheckedCreateWithoutCandidateInput> | SubmissionEventCreateWithoutCandidateInput[] | SubmissionEventUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: SubmissionEventCreateOrConnectWithoutCandidateInput | SubmissionEventCreateOrConnectWithoutCandidateInput[]
    upsert?: SubmissionEventUpsertWithWhereUniqueWithoutCandidateInput | SubmissionEventUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: SubmissionEventCreateManyCandidateInputEnvelope
    set?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    disconnect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    delete?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    connect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    update?: SubmissionEventUpdateWithWhereUniqueWithoutCandidateInput | SubmissionEventUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: SubmissionEventUpdateManyWithWhereWithoutCandidateInput | SubmissionEventUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: SubmissionEventScalarWhereInput | SubmissionEventScalarWhereInput[]
  }

  export type SubmissionEventUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<SubmissionEventCreateWithoutCandidateInput, SubmissionEventUncheckedCreateWithoutCandidateInput> | SubmissionEventCreateWithoutCandidateInput[] | SubmissionEventUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: SubmissionEventCreateOrConnectWithoutCandidateInput | SubmissionEventCreateOrConnectWithoutCandidateInput[]
    upsert?: SubmissionEventUpsertWithWhereUniqueWithoutCandidateInput | SubmissionEventUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: SubmissionEventCreateManyCandidateInputEnvelope
    set?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    disconnect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    delete?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    connect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    update?: SubmissionEventUpdateWithWhereUniqueWithoutCandidateInput | SubmissionEventUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: SubmissionEventUpdateManyWithWhereWithoutCandidateInput | SubmissionEventUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: SubmissionEventScalarWhereInput | SubmissionEventScalarWhereInput[]
  }

  export type CandidateCreateNestedManyWithoutResumeInput = {
    create?: XOR<CandidateCreateWithoutResumeInput, CandidateUncheckedCreateWithoutResumeInput> | CandidateCreateWithoutResumeInput[] | CandidateUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutResumeInput | CandidateCreateOrConnectWithoutResumeInput[]
    createMany?: CandidateCreateManyResumeInputEnvelope
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
  }

  export type CandidateUncheckedCreateNestedManyWithoutResumeInput = {
    create?: XOR<CandidateCreateWithoutResumeInput, CandidateUncheckedCreateWithoutResumeInput> | CandidateCreateWithoutResumeInput[] | CandidateUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutResumeInput | CandidateCreateOrConnectWithoutResumeInput[]
    createMany?: CandidateCreateManyResumeInputEnvelope
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
  }

  export type CandidateUpdateManyWithoutResumeNestedInput = {
    create?: XOR<CandidateCreateWithoutResumeInput, CandidateUncheckedCreateWithoutResumeInput> | CandidateCreateWithoutResumeInput[] | CandidateUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutResumeInput | CandidateCreateOrConnectWithoutResumeInput[]
    upsert?: CandidateUpsertWithWhereUniqueWithoutResumeInput | CandidateUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: CandidateCreateManyResumeInputEnvelope
    set?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    disconnect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    delete?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    update?: CandidateUpdateWithWhereUniqueWithoutResumeInput | CandidateUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: CandidateUpdateManyWithWhereWithoutResumeInput | CandidateUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
  }

  export type CandidateUncheckedUpdateManyWithoutResumeNestedInput = {
    create?: XOR<CandidateCreateWithoutResumeInput, CandidateUncheckedCreateWithoutResumeInput> | CandidateCreateWithoutResumeInput[] | CandidateUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutResumeInput | CandidateCreateOrConnectWithoutResumeInput[]
    upsert?: CandidateUpsertWithWhereUniqueWithoutResumeInput | CandidateUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: CandidateCreateManyResumeInputEnvelope
    set?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    disconnect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    delete?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    update?: CandidateUpdateWithWhereUniqueWithoutResumeInput | CandidateUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: CandidateUpdateManyWithWhereWithoutResumeInput | CandidateUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
  }

  export type JobDescriptionCreateNestedOneWithoutTestInput = {
    create?: XOR<JobDescriptionCreateWithoutTestInput, JobDescriptionUncheckedCreateWithoutTestInput>
    connectOrCreate?: JobDescriptionCreateOrConnectWithoutTestInput
    connect?: JobDescriptionWhereUniqueInput
  }

  export type TestCaseCreateNestedManyWithoutTestInput = {
    create?: XOR<TestCaseCreateWithoutTestInput, TestCaseUncheckedCreateWithoutTestInput> | TestCaseCreateWithoutTestInput[] | TestCaseUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutTestInput | TestCaseCreateOrConnectWithoutTestInput[]
    createMany?: TestCaseCreateManyTestInputEnvelope
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
  }

  export type TestFileCreateNestedManyWithoutTestInput = {
    create?: XOR<TestFileCreateWithoutTestInput, TestFileUncheckedCreateWithoutTestInput> | TestFileCreateWithoutTestInput[] | TestFileUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestFileCreateOrConnectWithoutTestInput | TestFileCreateOrConnectWithoutTestInput[]
    createMany?: TestFileCreateManyTestInputEnvelope
    connect?: TestFileWhereUniqueInput | TestFileWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutTestInput = {
    create?: XOR<SubmissionCreateWithoutTestInput, SubmissionUncheckedCreateWithoutTestInput> | SubmissionCreateWithoutTestInput[] | SubmissionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutTestInput | SubmissionCreateOrConnectWithoutTestInput[]
    createMany?: SubmissionCreateManyTestInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type SubmissionEventCreateNestedManyWithoutTestInput = {
    create?: XOR<SubmissionEventCreateWithoutTestInput, SubmissionEventUncheckedCreateWithoutTestInput> | SubmissionEventCreateWithoutTestInput[] | SubmissionEventUncheckedCreateWithoutTestInput[]
    connectOrCreate?: SubmissionEventCreateOrConnectWithoutTestInput | SubmissionEventCreateOrConnectWithoutTestInput[]
    createMany?: SubmissionEventCreateManyTestInputEnvelope
    connect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
  }

  export type TestCaseUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<TestCaseCreateWithoutTestInput, TestCaseUncheckedCreateWithoutTestInput> | TestCaseCreateWithoutTestInput[] | TestCaseUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutTestInput | TestCaseCreateOrConnectWithoutTestInput[]
    createMany?: TestCaseCreateManyTestInputEnvelope
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
  }

  export type TestFileUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<TestFileCreateWithoutTestInput, TestFileUncheckedCreateWithoutTestInput> | TestFileCreateWithoutTestInput[] | TestFileUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestFileCreateOrConnectWithoutTestInput | TestFileCreateOrConnectWithoutTestInput[]
    createMany?: TestFileCreateManyTestInputEnvelope
    connect?: TestFileWhereUniqueInput | TestFileWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<SubmissionCreateWithoutTestInput, SubmissionUncheckedCreateWithoutTestInput> | SubmissionCreateWithoutTestInput[] | SubmissionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutTestInput | SubmissionCreateOrConnectWithoutTestInput[]
    createMany?: SubmissionCreateManyTestInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type SubmissionEventUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<SubmissionEventCreateWithoutTestInput, SubmissionEventUncheckedCreateWithoutTestInput> | SubmissionEventCreateWithoutTestInput[] | SubmissionEventUncheckedCreateWithoutTestInput[]
    connectOrCreate?: SubmissionEventCreateOrConnectWithoutTestInput | SubmissionEventCreateOrConnectWithoutTestInput[]
    createMany?: SubmissionEventCreateManyTestInputEnvelope
    connect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type JobDescriptionUpdateOneRequiredWithoutTestNestedInput = {
    create?: XOR<JobDescriptionCreateWithoutTestInput, JobDescriptionUncheckedCreateWithoutTestInput>
    connectOrCreate?: JobDescriptionCreateOrConnectWithoutTestInput
    upsert?: JobDescriptionUpsertWithoutTestInput
    connect?: JobDescriptionWhereUniqueInput
    update?: XOR<XOR<JobDescriptionUpdateToOneWithWhereWithoutTestInput, JobDescriptionUpdateWithoutTestInput>, JobDescriptionUncheckedUpdateWithoutTestInput>
  }

  export type TestCaseUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestCaseCreateWithoutTestInput, TestCaseUncheckedCreateWithoutTestInput> | TestCaseCreateWithoutTestInput[] | TestCaseUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutTestInput | TestCaseCreateOrConnectWithoutTestInput[]
    upsert?: TestCaseUpsertWithWhereUniqueWithoutTestInput | TestCaseUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestCaseCreateManyTestInputEnvelope
    set?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    disconnect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    delete?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    update?: TestCaseUpdateWithWhereUniqueWithoutTestInput | TestCaseUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestCaseUpdateManyWithWhereWithoutTestInput | TestCaseUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
  }

  export type TestFileUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestFileCreateWithoutTestInput, TestFileUncheckedCreateWithoutTestInput> | TestFileCreateWithoutTestInput[] | TestFileUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestFileCreateOrConnectWithoutTestInput | TestFileCreateOrConnectWithoutTestInput[]
    upsert?: TestFileUpsertWithWhereUniqueWithoutTestInput | TestFileUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestFileCreateManyTestInputEnvelope
    set?: TestFileWhereUniqueInput | TestFileWhereUniqueInput[]
    disconnect?: TestFileWhereUniqueInput | TestFileWhereUniqueInput[]
    delete?: TestFileWhereUniqueInput | TestFileWhereUniqueInput[]
    connect?: TestFileWhereUniqueInput | TestFileWhereUniqueInput[]
    update?: TestFileUpdateWithWhereUniqueWithoutTestInput | TestFileUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestFileUpdateManyWithWhereWithoutTestInput | TestFileUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestFileScalarWhereInput | TestFileScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutTestNestedInput = {
    create?: XOR<SubmissionCreateWithoutTestInput, SubmissionUncheckedCreateWithoutTestInput> | SubmissionCreateWithoutTestInput[] | SubmissionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutTestInput | SubmissionCreateOrConnectWithoutTestInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutTestInput | SubmissionUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: SubmissionCreateManyTestInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutTestInput | SubmissionUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutTestInput | SubmissionUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type SubmissionEventUpdateManyWithoutTestNestedInput = {
    create?: XOR<SubmissionEventCreateWithoutTestInput, SubmissionEventUncheckedCreateWithoutTestInput> | SubmissionEventCreateWithoutTestInput[] | SubmissionEventUncheckedCreateWithoutTestInput[]
    connectOrCreate?: SubmissionEventCreateOrConnectWithoutTestInput | SubmissionEventCreateOrConnectWithoutTestInput[]
    upsert?: SubmissionEventUpsertWithWhereUniqueWithoutTestInput | SubmissionEventUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: SubmissionEventCreateManyTestInputEnvelope
    set?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    disconnect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    delete?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    connect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    update?: SubmissionEventUpdateWithWhereUniqueWithoutTestInput | SubmissionEventUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: SubmissionEventUpdateManyWithWhereWithoutTestInput | SubmissionEventUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: SubmissionEventScalarWhereInput | SubmissionEventScalarWhereInput[]
  }

  export type TestCaseUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestCaseCreateWithoutTestInput, TestCaseUncheckedCreateWithoutTestInput> | TestCaseCreateWithoutTestInput[] | TestCaseUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestCaseCreateOrConnectWithoutTestInput | TestCaseCreateOrConnectWithoutTestInput[]
    upsert?: TestCaseUpsertWithWhereUniqueWithoutTestInput | TestCaseUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestCaseCreateManyTestInputEnvelope
    set?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    disconnect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    delete?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    connect?: TestCaseWhereUniqueInput | TestCaseWhereUniqueInput[]
    update?: TestCaseUpdateWithWhereUniqueWithoutTestInput | TestCaseUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestCaseUpdateManyWithWhereWithoutTestInput | TestCaseUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
  }

  export type TestFileUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestFileCreateWithoutTestInput, TestFileUncheckedCreateWithoutTestInput> | TestFileCreateWithoutTestInput[] | TestFileUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestFileCreateOrConnectWithoutTestInput | TestFileCreateOrConnectWithoutTestInput[]
    upsert?: TestFileUpsertWithWhereUniqueWithoutTestInput | TestFileUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestFileCreateManyTestInputEnvelope
    set?: TestFileWhereUniqueInput | TestFileWhereUniqueInput[]
    disconnect?: TestFileWhereUniqueInput | TestFileWhereUniqueInput[]
    delete?: TestFileWhereUniqueInput | TestFileWhereUniqueInput[]
    connect?: TestFileWhereUniqueInput | TestFileWhereUniqueInput[]
    update?: TestFileUpdateWithWhereUniqueWithoutTestInput | TestFileUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestFileUpdateManyWithWhereWithoutTestInput | TestFileUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestFileScalarWhereInput | TestFileScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<SubmissionCreateWithoutTestInput, SubmissionUncheckedCreateWithoutTestInput> | SubmissionCreateWithoutTestInput[] | SubmissionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutTestInput | SubmissionCreateOrConnectWithoutTestInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutTestInput | SubmissionUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: SubmissionCreateManyTestInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutTestInput | SubmissionUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutTestInput | SubmissionUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type SubmissionEventUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<SubmissionEventCreateWithoutTestInput, SubmissionEventUncheckedCreateWithoutTestInput> | SubmissionEventCreateWithoutTestInput[] | SubmissionEventUncheckedCreateWithoutTestInput[]
    connectOrCreate?: SubmissionEventCreateOrConnectWithoutTestInput | SubmissionEventCreateOrConnectWithoutTestInput[]
    upsert?: SubmissionEventUpsertWithWhereUniqueWithoutTestInput | SubmissionEventUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: SubmissionEventCreateManyTestInputEnvelope
    set?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    disconnect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    delete?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    connect?: SubmissionEventWhereUniqueInput | SubmissionEventWhereUniqueInput[]
    update?: SubmissionEventUpdateWithWhereUniqueWithoutTestInput | SubmissionEventUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: SubmissionEventUpdateManyWithWhereWithoutTestInput | SubmissionEventUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: SubmissionEventScalarWhereInput | SubmissionEventScalarWhereInput[]
  }

  export type TestCreateNestedOneWithoutTestCasesInput = {
    create?: XOR<TestCreateWithoutTestCasesInput, TestUncheckedCreateWithoutTestCasesInput>
    connectOrCreate?: TestCreateOrConnectWithoutTestCasesInput
    connect?: TestWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TestUpdateOneRequiredWithoutTestCasesNestedInput = {
    create?: XOR<TestCreateWithoutTestCasesInput, TestUncheckedCreateWithoutTestCasesInput>
    connectOrCreate?: TestCreateOrConnectWithoutTestCasesInput
    upsert?: TestUpsertWithoutTestCasesInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutTestCasesInput, TestUpdateWithoutTestCasesInput>, TestUncheckedUpdateWithoutTestCasesInput>
  }

  export type TestCreateNestedOneWithoutFilesInput = {
    create?: XOR<TestCreateWithoutFilesInput, TestUncheckedCreateWithoutFilesInput>
    connectOrCreate?: TestCreateOrConnectWithoutFilesInput
    connect?: TestWhereUniqueInput
  }

  export type TestUpdateOneRequiredWithoutFilesNestedInput = {
    create?: XOR<TestCreateWithoutFilesInput, TestUncheckedCreateWithoutFilesInput>
    connectOrCreate?: TestCreateOrConnectWithoutFilesInput
    upsert?: TestUpsertWithoutFilesInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutFilesInput, TestUpdateWithoutFilesInput>, TestUncheckedUpdateWithoutFilesInput>
  }

  export type TestCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<TestCreateWithoutSubmissionsInput, TestUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: TestCreateOrConnectWithoutSubmissionsInput
    connect?: TestWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
  }

  export type TestUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<TestCreateWithoutSubmissionsInput, TestUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: TestCreateOrConnectWithoutSubmissionsInput
    upsert?: TestUpsertWithoutSubmissionsInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutSubmissionsInput, TestUpdateWithoutSubmissionsInput>, TestUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateOneWithoutSubmissionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    upsert?: UserUpsertWithoutSubmissionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmissionsInput, UserUpdateWithoutSubmissionsInput>, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type CandidateCreateNestedOneWithoutSubmissionEventsInput = {
    create?: XOR<CandidateCreateWithoutSubmissionEventsInput, CandidateUncheckedCreateWithoutSubmissionEventsInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutSubmissionEventsInput
    connect?: CandidateWhereUniqueInput
  }

  export type TestCreateNestedOneWithoutSubmissionEventsInput = {
    create?: XOR<TestCreateWithoutSubmissionEventsInput, TestUncheckedCreateWithoutSubmissionEventsInput>
    connectOrCreate?: TestCreateOrConnectWithoutSubmissionEventsInput
    connect?: TestWhereUniqueInput
  }

  export type CandidateUpdateOneWithoutSubmissionEventsNestedInput = {
    create?: XOR<CandidateCreateWithoutSubmissionEventsInput, CandidateUncheckedCreateWithoutSubmissionEventsInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutSubmissionEventsInput
    upsert?: CandidateUpsertWithoutSubmissionEventsInput
    disconnect?: CandidateWhereInput | boolean
    delete?: CandidateWhereInput | boolean
    connect?: CandidateWhereUniqueInput
    update?: XOR<XOR<CandidateUpdateToOneWithWhereWithoutSubmissionEventsInput, CandidateUpdateWithoutSubmissionEventsInput>, CandidateUncheckedUpdateWithoutSubmissionEventsInput>
  }

  export type TestUpdateOneWithoutSubmissionEventsNestedInput = {
    create?: XOR<TestCreateWithoutSubmissionEventsInput, TestUncheckedCreateWithoutSubmissionEventsInput>
    connectOrCreate?: TestCreateOrConnectWithoutSubmissionEventsInput
    upsert?: TestUpsertWithoutSubmissionEventsInput
    disconnect?: TestWhereInput | boolean
    delete?: TestWhereInput | boolean
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutSubmissionEventsInput, TestUpdateWithoutSubmissionEventsInput>, TestUncheckedUpdateWithoutSubmissionEventsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CompanyCreateWithoutUsersInput = {
    id?: string
    name: string
  }

  export type CompanyUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
  }

  export type CompanyCreateOrConnectWithoutUsersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
  }

  export type JobDescriptionCreateWithoutCreatorInput = {
    id?: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages?: JobDescriptionCreatelanguagesInput | string[]
    projectContext: string
    createdAt?: Date | string
    updatedAt?: Date | string
    test?: TestCreateNestedOneWithoutJobDescriptionInput
    candidates?: CandidateCreateNestedManyWithoutJobDescriptionInput
  }

  export type JobDescriptionUncheckedCreateWithoutCreatorInput = {
    id?: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages?: JobDescriptionCreatelanguagesInput | string[]
    projectContext: string
    createdAt?: Date | string
    updatedAt?: Date | string
    test?: TestUncheckedCreateNestedOneWithoutJobDescriptionInput
    candidates?: CandidateUncheckedCreateNestedManyWithoutJobDescriptionInput
  }

  export type JobDescriptionCreateOrConnectWithoutCreatorInput = {
    where: JobDescriptionWhereUniqueInput
    create: XOR<JobDescriptionCreateWithoutCreatorInput, JobDescriptionUncheckedCreateWithoutCreatorInput>
  }

  export type JobDescriptionCreateManyCreatorInputEnvelope = {
    data: JobDescriptionCreateManyCreatorInput | JobDescriptionCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type SubmissionCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    aiScore?: number | null
    test: TestCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    testId: string
    aiScore?: number | null
  }

  export type SubmissionCreateOrConnectWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput>
  }

  export type SubmissionCreateManyUserInputEnvelope = {
    data: SubmissionCreateManyUserInput | SubmissionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutUsersInput = {
    update: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type JobDescriptionUpsertWithWhereUniqueWithoutCreatorInput = {
    where: JobDescriptionWhereUniqueInput
    update: XOR<JobDescriptionUpdateWithoutCreatorInput, JobDescriptionUncheckedUpdateWithoutCreatorInput>
    create: XOR<JobDescriptionCreateWithoutCreatorInput, JobDescriptionUncheckedCreateWithoutCreatorInput>
  }

  export type JobDescriptionUpdateWithWhereUniqueWithoutCreatorInput = {
    where: JobDescriptionWhereUniqueInput
    data: XOR<JobDescriptionUpdateWithoutCreatorInput, JobDescriptionUncheckedUpdateWithoutCreatorInput>
  }

  export type JobDescriptionUpdateManyWithWhereWithoutCreatorInput = {
    where: JobDescriptionScalarWhereInput
    data: XOR<JobDescriptionUpdateManyMutationInput, JobDescriptionUncheckedUpdateManyWithoutCreatorInput>
  }

  export type JobDescriptionScalarWhereInput = {
    AND?: JobDescriptionScalarWhereInput | JobDescriptionScalarWhereInput[]
    OR?: JobDescriptionScalarWhereInput[]
    NOT?: JobDescriptionScalarWhereInput | JobDescriptionScalarWhereInput[]
    id?: StringFilter<"JobDescription"> | string
    title?: StringFilter<"JobDescription"> | string
    description?: StringFilter<"JobDescription"> | string
    minExperience?: IntFilter<"JobDescription"> | number
    maxExperience?: IntFilter<"JobDescription"> | number
    languages?: StringNullableListFilter<"JobDescription">
    projectContext?: StringFilter<"JobDescription"> | string
    createdAt?: DateTimeFilter<"JobDescription"> | Date | string
    updatedAt?: DateTimeFilter<"JobDescription"> | Date | string
    creatorId?: StringFilter<"JobDescription"> | string
  }

  export type SubmissionUpsertWithWhereUniqueWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutUserInput, SubmissionUncheckedUpdateWithoutUserInput>
    create: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutUserInput, SubmissionUncheckedUpdateWithoutUserInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutUserInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutUserInput>
  }

  export type SubmissionScalarWhereInput = {
    AND?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    OR?: SubmissionScalarWhereInput[]
    NOT?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    id?: StringFilter<"Submission"> | string
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    status?: StringFilter<"Submission"> | string
    result?: JsonNullableFilter<"Submission">
    feedback?: JsonNullableFilter<"Submission">
    testId?: StringFilter<"Submission"> | string
    userId?: StringNullableFilter<"Submission"> | string | null
    aiScore?: FloatNullableFilter<"Submission"> | number | null
  }

  export type UserCreateWithoutCompanyInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptions?: JobDescriptionCreateNestedManyWithoutCreatorInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptions?: JobDescriptionUncheckedCreateNestedManyWithoutCreatorInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserCreateManyCompanyInputEnvelope = {
    data: UserCreateManyCompanyInput | UserCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateManyWithWhereWithoutCompanyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    companyId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserCreateWithoutJobDescriptionsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUsersInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutJobDescriptionsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    companyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutJobDescriptionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJobDescriptionsInput, UserUncheckedCreateWithoutJobDescriptionsInput>
  }

  export type TestCreateWithoutJobDescriptionInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    testCases?: TestCaseCreateNestedManyWithoutTestInput
    files?: TestFileCreateNestedManyWithoutTestInput
    submissions?: SubmissionCreateNestedManyWithoutTestInput
    submissionEvents?: SubmissionEventCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutJobDescriptionInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    testCases?: TestCaseUncheckedCreateNestedManyWithoutTestInput
    files?: TestFileUncheckedCreateNestedManyWithoutTestInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutTestInput
    submissionEvents?: SubmissionEventUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutJobDescriptionInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutJobDescriptionInput, TestUncheckedCreateWithoutJobDescriptionInput>
  }

  export type CandidateCreateWithoutJobDescriptionInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resume: ResumeCreateNestedOneWithoutCandidatesInput
    submissionEvents?: SubmissionEventCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateWithoutJobDescriptionInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resumeId: string
    submissionEvents?: SubmissionEventUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateCreateOrConnectWithoutJobDescriptionInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutJobDescriptionInput, CandidateUncheckedCreateWithoutJobDescriptionInput>
  }

  export type CandidateCreateManyJobDescriptionInputEnvelope = {
    data: CandidateCreateManyJobDescriptionInput | CandidateCreateManyJobDescriptionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutJobDescriptionsInput = {
    update: XOR<UserUpdateWithoutJobDescriptionsInput, UserUncheckedUpdateWithoutJobDescriptionsInput>
    create: XOR<UserCreateWithoutJobDescriptionsInput, UserUncheckedCreateWithoutJobDescriptionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJobDescriptionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJobDescriptionsInput, UserUncheckedUpdateWithoutJobDescriptionsInput>
  }

  export type UserUpdateWithoutJobDescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUsersNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutJobDescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TestUpsertWithoutJobDescriptionInput = {
    update: XOR<TestUpdateWithoutJobDescriptionInput, TestUncheckedUpdateWithoutJobDescriptionInput>
    create: XOR<TestCreateWithoutJobDescriptionInput, TestUncheckedCreateWithoutJobDescriptionInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutJobDescriptionInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutJobDescriptionInput, TestUncheckedUpdateWithoutJobDescriptionInput>
  }

  export type TestUpdateWithoutJobDescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testCases?: TestCaseUpdateManyWithoutTestNestedInput
    files?: TestFileUpdateManyWithoutTestNestedInput
    submissions?: SubmissionUpdateManyWithoutTestNestedInput
    submissionEvents?: SubmissionEventUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutJobDescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testCases?: TestCaseUncheckedUpdateManyWithoutTestNestedInput
    files?: TestFileUncheckedUpdateManyWithoutTestNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutTestNestedInput
    submissionEvents?: SubmissionEventUncheckedUpdateManyWithoutTestNestedInput
  }

  export type CandidateUpsertWithWhereUniqueWithoutJobDescriptionInput = {
    where: CandidateWhereUniqueInput
    update: XOR<CandidateUpdateWithoutJobDescriptionInput, CandidateUncheckedUpdateWithoutJobDescriptionInput>
    create: XOR<CandidateCreateWithoutJobDescriptionInput, CandidateUncheckedCreateWithoutJobDescriptionInput>
  }

  export type CandidateUpdateWithWhereUniqueWithoutJobDescriptionInput = {
    where: CandidateWhereUniqueInput
    data: XOR<CandidateUpdateWithoutJobDescriptionInput, CandidateUncheckedUpdateWithoutJobDescriptionInput>
  }

  export type CandidateUpdateManyWithWhereWithoutJobDescriptionInput = {
    where: CandidateScalarWhereInput
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyWithoutJobDescriptionInput>
  }

  export type CandidateScalarWhereInput = {
    AND?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
    OR?: CandidateScalarWhereInput[]
    NOT?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
    id?: StringFilter<"Candidate"> | string
    status?: StringFilter<"Candidate"> | string
    suitabilityScore?: FloatNullableFilter<"Candidate"> | number | null
    suitabilityAnalysis?: JsonNullableFilter<"Candidate">
    individualRepoUrl?: StringNullableFilter<"Candidate"> | string | null
    repoCreatedAt?: DateTimeNullableFilter<"Candidate"> | Date | string | null
    createdAt?: DateTimeFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeFilter<"Candidate"> | Date | string
    jobDescriptionId?: StringFilter<"Candidate"> | string
    resumeId?: StringFilter<"Candidate"> | string
  }

  export type JobDescriptionCreateWithoutCandidatesInput = {
    id?: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages?: JobDescriptionCreatelanguagesInput | string[]
    projectContext: string
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutJobDescriptionsInput
    test?: TestCreateNestedOneWithoutJobDescriptionInput
  }

  export type JobDescriptionUncheckedCreateWithoutCandidatesInput = {
    id?: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages?: JobDescriptionCreatelanguagesInput | string[]
    projectContext: string
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    test?: TestUncheckedCreateNestedOneWithoutJobDescriptionInput
  }

  export type JobDescriptionCreateOrConnectWithoutCandidatesInput = {
    where: JobDescriptionWhereUniqueInput
    create: XOR<JobDescriptionCreateWithoutCandidatesInput, JobDescriptionUncheckedCreateWithoutCandidatesInput>
  }

  export type ResumeCreateWithoutCandidatesInput = {
    id?: string
    email: string
    filename: string
    path: string
    size: number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUncheckedCreateWithoutCandidatesInput = {
    id?: string
    email: string
    filename: string
    path: string
    size: number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeCreateOrConnectWithoutCandidatesInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutCandidatesInput, ResumeUncheckedCreateWithoutCandidatesInput>
  }

  export type SubmissionEventCreateWithoutCandidateInput = {
    id?: string
    repoName: string
    commitSha: string
    branch: string
    pusher: string
    eventType: string
    receivedAt?: Date | string
    test?: TestCreateNestedOneWithoutSubmissionEventsInput
  }

  export type SubmissionEventUncheckedCreateWithoutCandidateInput = {
    id?: string
    repoName: string
    commitSha: string
    branch: string
    pusher: string
    eventType: string
    receivedAt?: Date | string
    testId?: string | null
  }

  export type SubmissionEventCreateOrConnectWithoutCandidateInput = {
    where: SubmissionEventWhereUniqueInput
    create: XOR<SubmissionEventCreateWithoutCandidateInput, SubmissionEventUncheckedCreateWithoutCandidateInput>
  }

  export type SubmissionEventCreateManyCandidateInputEnvelope = {
    data: SubmissionEventCreateManyCandidateInput | SubmissionEventCreateManyCandidateInput[]
    skipDuplicates?: boolean
  }

  export type JobDescriptionUpsertWithoutCandidatesInput = {
    update: XOR<JobDescriptionUpdateWithoutCandidatesInput, JobDescriptionUncheckedUpdateWithoutCandidatesInput>
    create: XOR<JobDescriptionCreateWithoutCandidatesInput, JobDescriptionUncheckedCreateWithoutCandidatesInput>
    where?: JobDescriptionWhereInput
  }

  export type JobDescriptionUpdateToOneWithWhereWithoutCandidatesInput = {
    where?: JobDescriptionWhereInput
    data: XOR<JobDescriptionUpdateWithoutCandidatesInput, JobDescriptionUncheckedUpdateWithoutCandidatesInput>
  }

  export type JobDescriptionUpdateWithoutCandidatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutJobDescriptionsNestedInput
    test?: TestUpdateOneWithoutJobDescriptionNestedInput
  }

  export type JobDescriptionUncheckedUpdateWithoutCandidatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    test?: TestUncheckedUpdateOneWithoutJobDescriptionNestedInput
  }

  export type ResumeUpsertWithoutCandidatesInput = {
    update: XOR<ResumeUpdateWithoutCandidatesInput, ResumeUncheckedUpdateWithoutCandidatesInput>
    create: XOR<ResumeCreateWithoutCandidatesInput, ResumeUncheckedCreateWithoutCandidatesInput>
    where?: ResumeWhereInput
  }

  export type ResumeUpdateToOneWithWhereWithoutCandidatesInput = {
    where?: ResumeWhereInput
    data: XOR<ResumeUpdateWithoutCandidatesInput, ResumeUncheckedUpdateWithoutCandidatesInput>
  }

  export type ResumeUpdateWithoutCandidatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateWithoutCandidatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    analysis?: NullableJsonNullValueInput | InputJsonValue
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionEventUpsertWithWhereUniqueWithoutCandidateInput = {
    where: SubmissionEventWhereUniqueInput
    update: XOR<SubmissionEventUpdateWithoutCandidateInput, SubmissionEventUncheckedUpdateWithoutCandidateInput>
    create: XOR<SubmissionEventCreateWithoutCandidateInput, SubmissionEventUncheckedCreateWithoutCandidateInput>
  }

  export type SubmissionEventUpdateWithWhereUniqueWithoutCandidateInput = {
    where: SubmissionEventWhereUniqueInput
    data: XOR<SubmissionEventUpdateWithoutCandidateInput, SubmissionEventUncheckedUpdateWithoutCandidateInput>
  }

  export type SubmissionEventUpdateManyWithWhereWithoutCandidateInput = {
    where: SubmissionEventScalarWhereInput
    data: XOR<SubmissionEventUpdateManyMutationInput, SubmissionEventUncheckedUpdateManyWithoutCandidateInput>
  }

  export type SubmissionEventScalarWhereInput = {
    AND?: SubmissionEventScalarWhereInput | SubmissionEventScalarWhereInput[]
    OR?: SubmissionEventScalarWhereInput[]
    NOT?: SubmissionEventScalarWhereInput | SubmissionEventScalarWhereInput[]
    id?: StringFilter<"SubmissionEvent"> | string
    repoName?: StringFilter<"SubmissionEvent"> | string
    commitSha?: StringFilter<"SubmissionEvent"> | string
    branch?: StringFilter<"SubmissionEvent"> | string
    pusher?: StringFilter<"SubmissionEvent"> | string
    eventType?: StringFilter<"SubmissionEvent"> | string
    receivedAt?: DateTimeFilter<"SubmissionEvent"> | Date | string
    candidateId?: StringNullableFilter<"SubmissionEvent"> | string | null
    testId?: StringNullableFilter<"SubmissionEvent"> | string | null
  }

  export type CandidateCreateWithoutResumeInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescription: JobDescriptionCreateNestedOneWithoutCandidatesInput
    submissionEvents?: SubmissionEventCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateWithoutResumeInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
    submissionEvents?: SubmissionEventUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateCreateOrConnectWithoutResumeInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutResumeInput, CandidateUncheckedCreateWithoutResumeInput>
  }

  export type CandidateCreateManyResumeInputEnvelope = {
    data: CandidateCreateManyResumeInput | CandidateCreateManyResumeInput[]
    skipDuplicates?: boolean
  }

  export type CandidateUpsertWithWhereUniqueWithoutResumeInput = {
    where: CandidateWhereUniqueInput
    update: XOR<CandidateUpdateWithoutResumeInput, CandidateUncheckedUpdateWithoutResumeInput>
    create: XOR<CandidateCreateWithoutResumeInput, CandidateUncheckedCreateWithoutResumeInput>
  }

  export type CandidateUpdateWithWhereUniqueWithoutResumeInput = {
    where: CandidateWhereUniqueInput
    data: XOR<CandidateUpdateWithoutResumeInput, CandidateUncheckedUpdateWithoutResumeInput>
  }

  export type CandidateUpdateManyWithWhereWithoutResumeInput = {
    where: CandidateScalarWhereInput
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyWithoutResumeInput>
  }

  export type JobDescriptionCreateWithoutTestInput = {
    id?: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages?: JobDescriptionCreatelanguagesInput | string[]
    projectContext: string
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutJobDescriptionsInput
    candidates?: CandidateCreateNestedManyWithoutJobDescriptionInput
  }

  export type JobDescriptionUncheckedCreateWithoutTestInput = {
    id?: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages?: JobDescriptionCreatelanguagesInput | string[]
    projectContext: string
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    candidates?: CandidateUncheckedCreateNestedManyWithoutJobDescriptionInput
  }

  export type JobDescriptionCreateOrConnectWithoutTestInput = {
    where: JobDescriptionWhereUniqueInput
    create: XOR<JobDescriptionCreateWithoutTestInput, JobDescriptionUncheckedCreateWithoutTestInput>
  }

  export type TestCaseCreateWithoutTestInput = {
    id?: string
    description: string
    input?: string | null
    expectedOutput: string
    category?: string | null
    difficulty?: string | null
    points?: number | null
    verificationMethod?: string | null
  }

  export type TestCaseUncheckedCreateWithoutTestInput = {
    id?: string
    description: string
    input?: string | null
    expectedOutput: string
    category?: string | null
    difficulty?: string | null
    points?: number | null
    verificationMethod?: string | null
  }

  export type TestCaseCreateOrConnectWithoutTestInput = {
    where: TestCaseWhereUniqueInput
    create: XOR<TestCaseCreateWithoutTestInput, TestCaseUncheckedCreateWithoutTestInput>
  }

  export type TestCaseCreateManyTestInputEnvelope = {
    data: TestCaseCreateManyTestInput | TestCaseCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type TestFileCreateWithoutTestInput = {
    id?: string
    path: string
    content: string
  }

  export type TestFileUncheckedCreateWithoutTestInput = {
    id?: string
    path: string
    content: string
  }

  export type TestFileCreateOrConnectWithoutTestInput = {
    where: TestFileWhereUniqueInput
    create: XOR<TestFileCreateWithoutTestInput, TestFileUncheckedCreateWithoutTestInput>
  }

  export type TestFileCreateManyTestInputEnvelope = {
    data: TestFileCreateManyTestInput | TestFileCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type SubmissionCreateWithoutTestInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    aiScore?: number | null
    user?: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutTestInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    userId?: string | null
    aiScore?: number | null
  }

  export type SubmissionCreateOrConnectWithoutTestInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutTestInput, SubmissionUncheckedCreateWithoutTestInput>
  }

  export type SubmissionCreateManyTestInputEnvelope = {
    data: SubmissionCreateManyTestInput | SubmissionCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type SubmissionEventCreateWithoutTestInput = {
    id?: string
    repoName: string
    commitSha: string
    branch: string
    pusher: string
    eventType: string
    receivedAt?: Date | string
    candidate?: CandidateCreateNestedOneWithoutSubmissionEventsInput
  }

  export type SubmissionEventUncheckedCreateWithoutTestInput = {
    id?: string
    repoName: string
    commitSha: string
    branch: string
    pusher: string
    eventType: string
    receivedAt?: Date | string
    candidateId?: string | null
  }

  export type SubmissionEventCreateOrConnectWithoutTestInput = {
    where: SubmissionEventWhereUniqueInput
    create: XOR<SubmissionEventCreateWithoutTestInput, SubmissionEventUncheckedCreateWithoutTestInput>
  }

  export type SubmissionEventCreateManyTestInputEnvelope = {
    data: SubmissionEventCreateManyTestInput | SubmissionEventCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type JobDescriptionUpsertWithoutTestInput = {
    update: XOR<JobDescriptionUpdateWithoutTestInput, JobDescriptionUncheckedUpdateWithoutTestInput>
    create: XOR<JobDescriptionCreateWithoutTestInput, JobDescriptionUncheckedCreateWithoutTestInput>
    where?: JobDescriptionWhereInput
  }

  export type JobDescriptionUpdateToOneWithWhereWithoutTestInput = {
    where?: JobDescriptionWhereInput
    data: XOR<JobDescriptionUpdateWithoutTestInput, JobDescriptionUncheckedUpdateWithoutTestInput>
  }

  export type JobDescriptionUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutJobDescriptionsNestedInput
    candidates?: CandidateUpdateManyWithoutJobDescriptionNestedInput
  }

  export type JobDescriptionUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    candidates?: CandidateUncheckedUpdateManyWithoutJobDescriptionNestedInput
  }

  export type TestCaseUpsertWithWhereUniqueWithoutTestInput = {
    where: TestCaseWhereUniqueInput
    update: XOR<TestCaseUpdateWithoutTestInput, TestCaseUncheckedUpdateWithoutTestInput>
    create: XOR<TestCaseCreateWithoutTestInput, TestCaseUncheckedCreateWithoutTestInput>
  }

  export type TestCaseUpdateWithWhereUniqueWithoutTestInput = {
    where: TestCaseWhereUniqueInput
    data: XOR<TestCaseUpdateWithoutTestInput, TestCaseUncheckedUpdateWithoutTestInput>
  }

  export type TestCaseUpdateManyWithWhereWithoutTestInput = {
    where: TestCaseScalarWhereInput
    data: XOR<TestCaseUpdateManyMutationInput, TestCaseUncheckedUpdateManyWithoutTestInput>
  }

  export type TestCaseScalarWhereInput = {
    AND?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
    OR?: TestCaseScalarWhereInput[]
    NOT?: TestCaseScalarWhereInput | TestCaseScalarWhereInput[]
    id?: StringFilter<"TestCase"> | string
    description?: StringFilter<"TestCase"> | string
    input?: StringNullableFilter<"TestCase"> | string | null
    expectedOutput?: StringFilter<"TestCase"> | string
    category?: StringNullableFilter<"TestCase"> | string | null
    difficulty?: StringNullableFilter<"TestCase"> | string | null
    points?: IntNullableFilter<"TestCase"> | number | null
    verificationMethod?: StringNullableFilter<"TestCase"> | string | null
    testId?: StringFilter<"TestCase"> | string
  }

  export type TestFileUpsertWithWhereUniqueWithoutTestInput = {
    where: TestFileWhereUniqueInput
    update: XOR<TestFileUpdateWithoutTestInput, TestFileUncheckedUpdateWithoutTestInput>
    create: XOR<TestFileCreateWithoutTestInput, TestFileUncheckedCreateWithoutTestInput>
  }

  export type TestFileUpdateWithWhereUniqueWithoutTestInput = {
    where: TestFileWhereUniqueInput
    data: XOR<TestFileUpdateWithoutTestInput, TestFileUncheckedUpdateWithoutTestInput>
  }

  export type TestFileUpdateManyWithWhereWithoutTestInput = {
    where: TestFileScalarWhereInput
    data: XOR<TestFileUpdateManyMutationInput, TestFileUncheckedUpdateManyWithoutTestInput>
  }

  export type TestFileScalarWhereInput = {
    AND?: TestFileScalarWhereInput | TestFileScalarWhereInput[]
    OR?: TestFileScalarWhereInput[]
    NOT?: TestFileScalarWhereInput | TestFileScalarWhereInput[]
    id?: StringFilter<"TestFile"> | string
    path?: StringFilter<"TestFile"> | string
    content?: StringFilter<"TestFile"> | string
    testId?: StringFilter<"TestFile"> | string
  }

  export type SubmissionUpsertWithWhereUniqueWithoutTestInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutTestInput, SubmissionUncheckedUpdateWithoutTestInput>
    create: XOR<SubmissionCreateWithoutTestInput, SubmissionUncheckedCreateWithoutTestInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutTestInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutTestInput, SubmissionUncheckedUpdateWithoutTestInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutTestInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutTestInput>
  }

  export type SubmissionEventUpsertWithWhereUniqueWithoutTestInput = {
    where: SubmissionEventWhereUniqueInput
    update: XOR<SubmissionEventUpdateWithoutTestInput, SubmissionEventUncheckedUpdateWithoutTestInput>
    create: XOR<SubmissionEventCreateWithoutTestInput, SubmissionEventUncheckedCreateWithoutTestInput>
  }

  export type SubmissionEventUpdateWithWhereUniqueWithoutTestInput = {
    where: SubmissionEventWhereUniqueInput
    data: XOR<SubmissionEventUpdateWithoutTestInput, SubmissionEventUncheckedUpdateWithoutTestInput>
  }

  export type SubmissionEventUpdateManyWithWhereWithoutTestInput = {
    where: SubmissionEventScalarWhereInput
    data: XOR<SubmissionEventUpdateManyMutationInput, SubmissionEventUncheckedUpdateManyWithoutTestInput>
  }

  export type TestCreateWithoutTestCasesInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    jobDescription: JobDescriptionCreateNestedOneWithoutTestInput
    files?: TestFileCreateNestedManyWithoutTestInput
    submissions?: SubmissionCreateNestedManyWithoutTestInput
    submissionEvents?: SubmissionEventCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutTestCasesInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    files?: TestFileUncheckedCreateNestedManyWithoutTestInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutTestInput
    submissionEvents?: SubmissionEventUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutTestCasesInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutTestCasesInput, TestUncheckedCreateWithoutTestCasesInput>
  }

  export type TestUpsertWithoutTestCasesInput = {
    update: XOR<TestUpdateWithoutTestCasesInput, TestUncheckedUpdateWithoutTestCasesInput>
    create: XOR<TestCreateWithoutTestCasesInput, TestUncheckedCreateWithoutTestCasesInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutTestCasesInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutTestCasesInput, TestUncheckedUpdateWithoutTestCasesInput>
  }

  export type TestUpdateWithoutTestCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobDescription?: JobDescriptionUpdateOneRequiredWithoutTestNestedInput
    files?: TestFileUpdateManyWithoutTestNestedInput
    submissions?: SubmissionUpdateManyWithoutTestNestedInput
    submissionEvents?: SubmissionEventUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutTestCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    files?: TestFileUncheckedUpdateManyWithoutTestNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutTestNestedInput
    submissionEvents?: SubmissionEventUncheckedUpdateManyWithoutTestNestedInput
  }

  export type TestCreateWithoutFilesInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    jobDescription: JobDescriptionCreateNestedOneWithoutTestInput
    testCases?: TestCaseCreateNestedManyWithoutTestInput
    submissions?: SubmissionCreateNestedManyWithoutTestInput
    submissionEvents?: SubmissionEventCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutFilesInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    testCases?: TestCaseUncheckedCreateNestedManyWithoutTestInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutTestInput
    submissionEvents?: SubmissionEventUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutFilesInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutFilesInput, TestUncheckedCreateWithoutFilesInput>
  }

  export type TestUpsertWithoutFilesInput = {
    update: XOR<TestUpdateWithoutFilesInput, TestUncheckedUpdateWithoutFilesInput>
    create: XOR<TestCreateWithoutFilesInput, TestUncheckedCreateWithoutFilesInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutFilesInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutFilesInput, TestUncheckedUpdateWithoutFilesInput>
  }

  export type TestUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobDescription?: JobDescriptionUpdateOneRequiredWithoutTestNestedInput
    testCases?: TestCaseUpdateManyWithoutTestNestedInput
    submissions?: SubmissionUpdateManyWithoutTestNestedInput
    submissionEvents?: SubmissionEventUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testCases?: TestCaseUncheckedUpdateManyWithoutTestNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutTestNestedInput
    submissionEvents?: SubmissionEventUncheckedUpdateManyWithoutTestNestedInput
  }

  export type TestCreateWithoutSubmissionsInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    jobDescription: JobDescriptionCreateNestedOneWithoutTestInput
    testCases?: TestCaseCreateNestedManyWithoutTestInput
    files?: TestFileCreateNestedManyWithoutTestInput
    submissionEvents?: SubmissionEventCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    testCases?: TestCaseUncheckedCreateNestedManyWithoutTestInput
    files?: TestFileUncheckedCreateNestedManyWithoutTestInput
    submissionEvents?: SubmissionEventUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutSubmissionsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutSubmissionsInput, TestUncheckedCreateWithoutSubmissionsInput>
  }

  export type UserCreateWithoutSubmissionsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUsersInput
    jobDescriptions?: JobDescriptionCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    companyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptions?: JobDescriptionUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutSubmissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
  }

  export type TestUpsertWithoutSubmissionsInput = {
    update: XOR<TestUpdateWithoutSubmissionsInput, TestUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<TestCreateWithoutSubmissionsInput, TestUncheckedCreateWithoutSubmissionsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutSubmissionsInput, TestUncheckedUpdateWithoutSubmissionsInput>
  }

  export type TestUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobDescription?: JobDescriptionUpdateOneRequiredWithoutTestNestedInput
    testCases?: TestCaseUpdateManyWithoutTestNestedInput
    files?: TestFileUpdateManyWithoutTestNestedInput
    submissionEvents?: SubmissionEventUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testCases?: TestCaseUncheckedUpdateManyWithoutTestNestedInput
    files?: TestFileUncheckedUpdateManyWithoutTestNestedInput
    submissionEvents?: SubmissionEventUncheckedUpdateManyWithoutTestNestedInput
  }

  export type UserUpsertWithoutSubmissionsInput = {
    update: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUsersNestedInput
    jobDescriptions?: JobDescriptionUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptions?: JobDescriptionUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type CandidateCreateWithoutSubmissionEventsInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescription: JobDescriptionCreateNestedOneWithoutCandidatesInput
    resume: ResumeCreateNestedOneWithoutCandidatesInput
  }

  export type CandidateUncheckedCreateWithoutSubmissionEventsInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
    resumeId: string
  }

  export type CandidateCreateOrConnectWithoutSubmissionEventsInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutSubmissionEventsInput, CandidateUncheckedCreateWithoutSubmissionEventsInput>
  }

  export type TestCreateWithoutSubmissionEventsInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    jobDescription: JobDescriptionCreateNestedOneWithoutTestInput
    testCases?: TestCaseCreateNestedManyWithoutTestInput
    files?: TestFileCreateNestedManyWithoutTestInput
    submissions?: SubmissionCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutSubmissionEventsInput = {
    id?: string
    title: string
    description?: string | null
    difficulty: string
    gitRepoUrl?: string | null
    language: string
    requirements: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
    repoArchived?: boolean
    repoArchivedAt?: Date | string | null
    testCases?: TestCaseUncheckedCreateNestedManyWithoutTestInput
    files?: TestFileUncheckedCreateNestedManyWithoutTestInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutSubmissionEventsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutSubmissionEventsInput, TestUncheckedCreateWithoutSubmissionEventsInput>
  }

  export type CandidateUpsertWithoutSubmissionEventsInput = {
    update: XOR<CandidateUpdateWithoutSubmissionEventsInput, CandidateUncheckedUpdateWithoutSubmissionEventsInput>
    create: XOR<CandidateCreateWithoutSubmissionEventsInput, CandidateUncheckedCreateWithoutSubmissionEventsInput>
    where?: CandidateWhereInput
  }

  export type CandidateUpdateToOneWithWhereWithoutSubmissionEventsInput = {
    where?: CandidateWhereInput
    data: XOR<CandidateUpdateWithoutSubmissionEventsInput, CandidateUncheckedUpdateWithoutSubmissionEventsInput>
  }

  export type CandidateUpdateWithoutSubmissionEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescription?: JobDescriptionUpdateOneRequiredWithoutCandidatesNestedInput
    resume?: ResumeUpdateOneRequiredWithoutCandidatesNestedInput
  }

  export type CandidateUncheckedUpdateWithoutSubmissionEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
  }

  export type TestUpsertWithoutSubmissionEventsInput = {
    update: XOR<TestUpdateWithoutSubmissionEventsInput, TestUncheckedUpdateWithoutSubmissionEventsInput>
    create: XOR<TestCreateWithoutSubmissionEventsInput, TestUncheckedCreateWithoutSubmissionEventsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutSubmissionEventsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutSubmissionEventsInput, TestUncheckedUpdateWithoutSubmissionEventsInput>
  }

  export type TestUpdateWithoutSubmissionEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobDescription?: JobDescriptionUpdateOneRequiredWithoutTestNestedInput
    testCases?: TestCaseUpdateManyWithoutTestNestedInput
    files?: TestFileUpdateManyWithoutTestNestedInput
    submissions?: SubmissionUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutSubmissionEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    requirements?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
    repoArchived?: BoolFieldUpdateOperationsInput | boolean
    repoArchivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testCases?: TestCaseUncheckedUpdateManyWithoutTestNestedInput
    files?: TestFileUncheckedUpdateManyWithoutTestNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutTestNestedInput
  }

  export type JobDescriptionCreateManyCreatorInput = {
    id?: string
    title: string
    description: string
    minExperience: number
    maxExperience: number
    languages?: JobDescriptionCreatelanguagesInput | string[]
    projectContext: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    testId: string
    aiScore?: number | null
  }

  export type JobDescriptionUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneWithoutJobDescriptionNestedInput
    candidates?: CandidateUpdateManyWithoutJobDescriptionNestedInput
  }

  export type JobDescriptionUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUncheckedUpdateOneWithoutJobDescriptionNestedInput
    candidates?: CandidateUncheckedUpdateManyWithoutJobDescriptionNestedInput
  }

  export type JobDescriptionUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    minExperience?: IntFieldUpdateOperationsInput | number
    maxExperience?: IntFieldUpdateOperationsInput | number
    languages?: JobDescriptionUpdatelanguagesInput | string[]
    projectContext?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
    test?: TestUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    testId?: StringFieldUpdateOperationsInput | string
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type SubmissionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    testId?: StringFieldUpdateOperationsInput | string
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UserCreateManyCompanyInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptions?: JobDescriptionUpdateManyWithoutCreatorNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptions?: JobDescriptionUncheckedUpdateManyWithoutCreatorNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateCreateManyJobDescriptionInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resumeId: string
  }

  export type CandidateUpdateWithoutJobDescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resume?: ResumeUpdateOneRequiredWithoutCandidatesNestedInput
    submissionEvents?: SubmissionEventUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateWithoutJobDescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumeId?: StringFieldUpdateOperationsInput | string
    submissionEvents?: SubmissionEventUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateManyWithoutJobDescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumeId?: StringFieldUpdateOperationsInput | string
  }

  export type SubmissionEventCreateManyCandidateInput = {
    id?: string
    repoName: string
    commitSha: string
    branch: string
    pusher: string
    eventType: string
    receivedAt?: Date | string
    testId?: string | null
  }

  export type SubmissionEventUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    pusher?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneWithoutSubmissionEventsNestedInput
  }

  export type SubmissionEventUncheckedUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    pusher?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubmissionEventUncheckedUpdateManyWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    pusher?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CandidateCreateManyResumeInput = {
    id?: string
    status: string
    suitabilityScore?: number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: string | null
    repoCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobDescriptionId: string
  }

  export type CandidateUpdateWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescription?: JobDescriptionUpdateOneRequiredWithoutCandidatesNestedInput
    submissionEvents?: SubmissionEventUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
    submissionEvents?: SubmissionEventUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateManyWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    suitabilityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    suitabilityAnalysis?: NullableJsonNullValueInput | InputJsonValue
    individualRepoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobDescriptionId?: StringFieldUpdateOperationsInput | string
  }

  export type TestCaseCreateManyTestInput = {
    id?: string
    description: string
    input?: string | null
    expectedOutput: string
    category?: string | null
    difficulty?: string | null
    points?: number | null
    verificationMethod?: string | null
  }

  export type TestFileCreateManyTestInput = {
    id?: string
    path: string
    content: string
  }

  export type SubmissionCreateManyTestInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status: string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    userId?: string | null
    aiScore?: number | null
  }

  export type SubmissionEventCreateManyTestInput = {
    id?: string
    repoName: string
    commitSha: string
    branch: string
    pusher: string
    eventType: string
    receivedAt?: Date | string
    candidateId?: string | null
  }

  export type TestCaseUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TestCaseUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TestCaseUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    points?: NullableIntFieldUpdateOperationsInput | number | null
    verificationMethod?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TestFileUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type TestFileUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type TestFileUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type SubmissionUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type SubmissionUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    result?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    aiScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type SubmissionEventUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    pusher?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneWithoutSubmissionEventsNestedInput
  }

  export type SubmissionEventUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    pusher?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubmissionEventUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    repoName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    pusher?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}