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
  tell: false,
  toggleTell: () => set((state) => ({ tell: !state.tell })),
  system: false,
  toggleSystem: () => set((state) => ({ system: !state.system })),
  portrait: false,
  togglePortrait: () => set((state) => ({ portrait: !state.portrait })),
  language: false,
  toggleLanguage: () => set((state) => ({ language: !state.language })),
}));

export default useStore;
