import create from 'zustand';

const useStore = create((set) => ({
  names: [],
  addName: (name) => set((state) => ({ names: [...state.names, name] })),
  removeName: (index) => set((state) => {
    const updatedNames = [...state.names];
    updatedNames.splice(index, 1);

    return ({ names: updatedNames });
  }),
  search: '',
  setSearch: (search) => set((state) => ({ ...state, search })),
}));

export default useStore;
