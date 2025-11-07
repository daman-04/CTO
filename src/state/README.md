# State

This directory contains global state management using Zustand.

## Structure

- Create stores for different domains (user, app, etc.)
- Keep stores focused and single-purpose
- Export typed hooks for store access

## Example

```typescript
// userStore.ts
import { create } from 'zustand'

interface UserState {
  user: User | null
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```
