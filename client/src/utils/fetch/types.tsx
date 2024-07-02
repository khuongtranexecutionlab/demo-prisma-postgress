export enum EMethod {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
  Head = 5,
}

export type MethodsTypes = EMethod.Get | EMethod.Post | EMethod.Put | EMethod.Delete | EMethod.Head
