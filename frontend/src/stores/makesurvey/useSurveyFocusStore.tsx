import { create } from 'zustand';

interface SurveyFocusStore {
  selectedSurvey: any;
  prevSelectedSurvey: any;
  setSelectedSurvey: (survey: any) => void;
  resetSelectedSurvey: () => void;
}

const useSurveyFocus = create<SurveyFocusStore>((set) => ({
  selectedSurvey: 1,
  prevSelectedSurvey: 0,
  setSelectedSurvey: (survey : any) =>
    set((state : any) => ({
      selectedSurvey: survey,
      prevSelectedSurvey: state.selectedSurvey,
    })),
  resetSelectedSurvey: () => set({ selectedSurvey: 1, prevSelectedSurvey: 0 }),

}));

export default useSurveyFocus;