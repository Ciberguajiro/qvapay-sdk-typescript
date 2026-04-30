enum SDK_Error {
  NetWork,
  Serialization,
  Api,
  Auth,
  Unknown,
}

export function GenerateError(error: SDK_Error, message: String) {
  switch (error) {
    case SDK_Error.NetWork: {
      return `Error de Red: ${message}`;
    }
    case SDK_Error.Serialization: {
      return `Error de Serializacion: ${message}`;
    }
    case SDK_Error.Api: {
      return `Error de api: ${message}`;
    }
    case SDK_Error.Auth: {
      return `Error de auth: ${message}`;
    }
    case SDK_Error.Unknown: {
      return `Error desconocido: ${message}`;
    }
    default: {
      return `Error General: ${message}`;
    }
  }
}
