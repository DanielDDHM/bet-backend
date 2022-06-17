export enum DefaultMessages {
  USER_EXISTS = 'USER EXISTS',
  USER_NOT_EXISTS = 'USER DOESNT EXISTS',
  USER_CREATED = 'USER CREATED',
  USER_DELETED = 'USER DELETED',
  USER_UPDATED = 'USER UPDATED',
  USER_ACTIVATED = 'USER ACTIVATED',
  USER_CONFIRMED = 'USER CONFIRMED',
  USER_FIND = 'USER FIND',
  USER_PROBLEM = 'PROBLEM WITH USER',
  USER_NOT_ACTIVE = 'USER IS NOT ACTIVE',
  USER_NOT_CONFIRMED = 'USER IS NOT CONFIRMED',
  USER_NOT_SAME = 'USER IS NOT ACTIVE AND CONFIRMED',
  USER_HAS_CONFIRMED = 'USER HAS CONFIRMED',

  BET_NOT_EXISTS = 'BET DOESNT EXISTS',
  BET_CREATED = 'BET CREATED',
  BET_DELETED = 'BET DELETED',
  BET_UPDATED = 'BET UPDATED',
  BET_CONFIRMED = 'BET FINDED',
  BET_FIND = 'BET FIND',

  GAME_NOT_EXISTS = 'GAME DOESNT EXISTS',
  GAME_CREATED = 'GAME CREATED',
  GAME_DELETED = 'GAME DELETED',
  GAME_UPDATED = 'GAME UPDATED',
  GAME_ACTIVATED = 'GAME ACTIVATED',
  GAME_CONFIRMED = 'GAME FINDED',
  GAME_FIND = 'GAME FIND',

  ADDRESS_CREATED = 'ADDRESS CREATED',
  ADDRESS_NOT_FOUND = 'ADDRESS_NOT_FOUND',

  NOT_STAFF = 'YOURE NOT A STAFF',
  NOT_PERMITED = 'YOU DONT HAVE PERMISSION FOR THIS',
  CPF_API_NOT_WORKING = 'API CPF NAO ESTA EM FUNCIONAMENTO',
  INVALID_TOKEN = 'NO TOKEN PROVIDED',
  MISSING_TOKEN = 'TOKEN IS MISSING',
  CURIOSITY = 'I ATE THE ASS OF WHO\'S READING',
  WRONG_DATA = 'WRONG DATA',
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"

}

export enum CrudOperations {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum UserTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER = 'OWNER'
}

export enum DefaultStatus {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
  QUEUED = 'QUEUED',
  PENDING = 'PENDING'
}
