export type Role = 'owner' | 'staff'

export interface SessionUser {
    id: string
    name: string
    email: string
    role: Role
}

export interface JWTPayload {
    id: string
    role: Role
}