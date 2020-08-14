import { createSelector } from "reselect";

const selectPanel = (state) => {
  return state.recruiter.panel;
};

export const selectJobs = createSelector([selectPanel], (panel) => {
  return panel.jobs;
});

export const selectJobCount = createSelector([selectJobs], (Jobs) => {
  const arr = Object.keys(Jobs).map((key) => Object.keys(Jobs[key]).length);
  return arr;
});

export const selectCandidates = createSelector([selectPanel], (panel) => {
  return panel.candidate;
});

export const selectCandidateModal = createSelector([selectPanel], (panel) => {
  return panel.showModal;
});

export const selectSelectedJob = createSelector([selectPanel], (panel) => {
  return panel.selectedJob;
});

export const selectCandidateCount = createSelector([selectPanel], (panel) => {
  const count = Object.keys(panel.candidate).length;

  return count;
});
