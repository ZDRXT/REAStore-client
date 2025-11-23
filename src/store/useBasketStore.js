import { create } from 'zustand'

const useBasketStore = create((set) => ({
    games: [],
    addToBasket: (gameId) => set((state) => {
        const exGame = state.games.find(item => item.id === gameId)
        if (!exGame) return { games: [...state.games, { id: gameId, counts: 1 }] }
        return { games: state.games.map((item) => item.id === gameId ? { ...item, counts: item.counts + 1 } : item) }
    }),
    removeFromBasket: (gameId) => set((state) => ({ games: state.games.filter((item) => item.id !== gameId) })),
    plusCount: (gameId) => set((state) => ({ games: state.games.map((item) => item.id === gameId ? { ...item, counts: item.counts + 1 } : item) })),
    minusCount: (gameId) => set((state) => ({ games: state.games.map((item) => item.id === gameId && item.counts > 1 ? { ...item, counts: item.counts - 1 } : item) })),
    clearBasket: () => set({ games: [] }),
}))

export default useBasketStore