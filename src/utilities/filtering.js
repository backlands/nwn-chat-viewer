import create from 'zustand';

const useStore = create((set) => ({
  names: [],
  addName: (name) => set((state) => ({ names: [state.names, name] })),
  removeName: () => set({ names: [] }),
  search: '',
  setSearch: (search) => set((state) => ({ ...state, search })),
}));

export default useStore;
