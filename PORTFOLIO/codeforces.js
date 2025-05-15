async function getCodeforcesStats(handle) {
  const baseUrl = "https://codeforces.com/api/";

  try {
    const ratingRes = await fetch(`${baseUrl}user.rating?handle=${handle}`);
    const ratingData = await ratingRes.json();
    if (ratingData.status !== "OK") throw new Error("Failed to fetch rating.");

    const contestsGiven = ratingData.result.length;
    const currentRating = contestsGiven ? ratingData.result[contestsGiven - 1].newRating : "Unrated";
    const peakRating = Math.max(...ratingData.result.map(r => r.newRating));

    const statusRes = await fetch(`${baseUrl}user.status?handle=${handle}`);
    const statusData = await statusRes.json();
    if (statusData.status !== "OK") throw new Error("Failed to fetch submission data.");

    const solvedSet = new Set();
    statusData.result.forEach(submission => {
      if (submission.verdict === "OK") {
        const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
        solvedSet.add(problemId);
      }
    });

    // Inject data into the DOM
    document.getElementById("cf-problems").textContent = solvedSet.size;
    document.getElementById("cf-contests").textContent = contestsGiven;
    document.getElementById("cf-peak").textContent = peakRating;
    document.getElementById("cf-current").textContent = currentRating;

  } catch (err) {
    console.error("Error:", err.message);
    document.getElementById("cf-problems").textContent = "N/A";
    document.getElementById("cf-contests").textContent = "N/A";
    document.getElementById("cf-peak").textContent = "N/A";
    document.getElementById("cf-current").textContent = "N/A";
  }
}

getCodeforcesStats("hardliner01");