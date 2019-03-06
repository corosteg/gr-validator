
module.exports = (obj, pathData, db, status) => new Promise((resolve, reject) => {
  const docRef = db.collection(`cohorts/${pathData.cohortId}/users/${pathData.uid}/progress`)
    .doc(`${pathData.projectId}`);
  if (obj) {
    docRef
      .update({
        resultValidation: {
          status,
          response: obj,
          uid: pathData.uid,
          githubLink: pathData.repo,
          project: pathData.projectId,
        },
      })
      .then(() => resolve({ success: true }))
      .catch(err => reject(err));
  } else {
    docRef
      .update({
        resultValidation: {
          status,
          uid: pathData.uid,
          repo: pathData.repo,
        },
      })
      .then(() => resolve({ success: true }))
      .catch(err => reject(err));
  }
});
