import { DataFile, LogChip } from "./StoragePanel";
import { interpolate, spring } from "remotion";

const FPS = 30;

export const useStorageData = (frame: number, fps: number) => {
  // Scene timings
  const tScene3 = 19 * FPS; // Intro (6) + Lakes (13) = 19s
  const tScene4 = tScene3 + 11 * FPS; // + Create (11) = 30s
  const tScene5 = tScene4 + 13 * FPS; // + Atomic Commits (13) = 43s
  const tScene6 = tScene5 + 13 * FPS; // + Concurrent Writers (13) = 56s
  const tScene7 = tScene6 + 11 * FPS; // + Schema (11) = 67s
  const tScene8 = tScene7 + 13 * FPS; // + Update (13) = 80s
  const tScene9 = tScene8 + 13 * FPS; // + Time Travel (13) = 93s
  const tScene10 = tScene9 + 12 * FPS; // + Checkpoints (12) = 105s
  const tScene11 = tScene10 + 11 * FPS; // + Optimize (11) = 116s
  const tScene12 = tScene11 + 11 * FPS; // + Data Skipping (11) = 127s

  let dataFiles: DataFile[] = [];
  let logChips: LogChip[] = [];
  let version = -1;
  let activeCount = 0;
  let note = "";

  // Base files available early on
  const f0: DataFile = { id: "f0", name: "part-000", status: "active" };
  const f1: DataFile = { id: "f1", name: "part-001", status: "active" };
  const f2: DataFile = { id: "f2", name: "part-002", status: "active" };
  const f3: DataFile = { id: "f3", name: "part-003", status: "active" };
  const f4: DataFile = { id: "f4", name: "part-004", status: "crashed" };
  const f5: DataFile = { id: "f5", name: "part-005", status: "active" };
  const f6: DataFile = { id: "f6", name: "part-006", status: "active" };
  const f7: DataFile = { id: "f7", name: "part-007", status: "active" };
  const f8: DataFile = { id: "f8", name: "part-008", status: "active" };

  const l0: LogChip = { id: "l0", name: "000.json", status: "committed" };
  const l1: LogChip = { id: "l1", name: "001.json", status: "committed" };
  const l2: LogChip = { id: "l2", name: "002.json", status: "committed" };
  const l3: LogChip = { id: "l3", name: "003.json", status: "committed" };
  const l4: LogChip = { id: "l4", name: "004.json", status: "committed" };
  const l5: LogChip = { id: "l5", name: "005.json", status: "committed" };

  if (frame >= tScene3 && frame < tScene4) {
    // Scene 3
    const localFrame = frame - tScene3;
    const file1 = spring({ frame: localFrame - 30, fps });
    const file2 = spring({ frame: localFrame - 45, fps });
    const log = spring({ frame: localFrame - 90, fps });

    if (file1 > 0.1) dataFiles.push(f0);
    if (file2 > 0.1) dataFiles.push(f1);
    if (log > 0.1) {
      logChips.push(l0);
      version = 0;
    }
    activeCount = dataFiles.length;
    note = "Initial creation";
  } else if (frame >= tScene4 && frame < tScene5) {
    // Scene 4
    const localFrame = frame - tScene4;
    const writeStart = spring({ frame: localFrame - 30, fps });
    const commit = spring({ frame: localFrame - 120, fps });
    const crashStart = spring({ frame: localFrame - 210, fps });
    const crashHappen = spring({ frame: localFrame - 260, fps });

    dataFiles = [f0, f1];
    logChips = [l0];

    if (writeStart > 0.1) {
      dataFiles.push({ ...f2, status: commit > 0.1 ? "active" : "writing" });
      dataFiles.push({ ...f3, status: commit > 0.1 ? "active" : "writing" });
    }
    if (crashStart > 0.1) {
      dataFiles.push({ ...f4, status: crashHappen > 0.1 ? "crashed" : "writing" });
    }
    if (commit > 0.1) logChips.push(l1);

    version = commit > 0.1 ? 1 : 0;
    activeCount = commit > 0.1 ? 4 : 2;
    note = crashHappen > 0.1 ? "Readers ignore crashed files" : (commit > 0.1 ? "Commit successful" : "Writing files...");
  } else if (frame >= tScene5 && frame < tScene6) {
    // Scene 5
    const localFrame = frame - tScene5;
    const writerAStart = spring({ frame: localFrame - 30, fps });
    const writerBStart = spring({ frame: localFrame - 60, fps });
    const writerACommit = spring({ frame: localFrame - 90, fps });
    const writerBBounce = spring({ frame: localFrame - 150, fps });
    const writerBRetry = spring({ frame: localFrame - 210, fps });

    dataFiles = [f0, f1, f2, f3, f4];
    logChips = [l0, l1];

    if (writerAStart > 0.1) dataFiles.push({ ...f5, status: writerACommit > 0.1 ? "active" : "writing" });
    if (writerBStart > 0.1) dataFiles.push({ ...f6, status: writerBRetry > 0.1 ? "active" : "writing" });

    if (writerACommit > 0.1) logChips.push(l2);
    if (writerBBounce > 0.1 && writerBRetry < 0.1) logChips.push({ id: "lb", name: "002 (B)", status: "rejected" });
    if (writerBRetry > 0.1) logChips.push(l3);

    version = writerBRetry > 0.1 ? 3 : (writerACommit > 0.1 ? 2 : 1);
    activeCount = writerBRetry > 0.1 ? 6 : (writerACommit > 0.1 ? 5 : 4);
    note = writerBRetry > 0.1 ? "B retries and succeeds as v3" : (writerBBounce > 0.1 ? "B rejected (v2 already taken)" : (writerACommit > 0.1 ? "A succeeds (v2)" : "Writers competing..."));
  } else if (frame >= tScene6 && frame < tScene7) {
    // Scene 6
    const localFrame = frame - tScene6;
    const badWriteStart = spring({ frame: localFrame - 30, fps });
    const badWriteReject = spring({ frame: localFrame - 90, fps });
    const mergeSchemaStart = spring({ frame: localFrame - 150, fps });
    const mergeSchemaCommit = spring({ frame: localFrame - 210, fps });

    dataFiles = [f0, f1, f2, f3, f5, f6];
    logChips = [l0, l1, l2, l3];

    if (mergeSchemaStart > 0.1) dataFiles.push({ ...f7, status: mergeSchemaCommit > 0.1 ? "active" : "writing" });
    if (mergeSchemaCommit > 0.1) logChips.push(l4);

    version = mergeSchemaCommit > 0.1 ? 4 : 3;
    activeCount = mergeSchemaCommit > 0.1 ? 7 : 6;
    note = mergeSchemaCommit > 0.1 ? "Schema: (id, customer, amount) + region" : (badWriteReject > 0.1 && mergeSchemaStart < 0.1 ? "Type mismatch rejected!" : (badWriteStart > 0.1 && badWriteReject < 0.1 ? "Checking schema..." : "Schema: (id, customer, amount)"));
  } else if (frame >= tScene7 && frame < tScene8) {
    // Scene 7
    const localFrame = frame - tScene7;
    const findStart = spring({ frame: localFrame - 30, fps });
    const copyStart = spring({ frame: localFrame - 90, fps });
    const commitMerge = spring({ frame: localFrame - 180, fps });

    dataFiles = [f0, { ...f1, status: commitMerge > 0.1 ? "removed" : "active", highlight: findStart > 0.1 && commitMerge < 0.1 }, f2, f3, f5, f6, f7];
    logChips = [l0, l1, l2, l3, l4];

    if (copyStart > 0.1) dataFiles.push({ ...f8, status: commitMerge > 0.1 ? "active" : "writing" });
    if (commitMerge > 0.1) logChips.push(l5);

    version = commitMerge > 0.1 ? 5 : 4;
    activeCount = 7;
    note = commitMerge > 0.1 ? "Old file marked removed, new file active" : (copyStart > 0.1 ? "Writing corrected copy..." : (findStart > 0.1 ? "Locating target file..." : "Starting MERGE..."));
  } else if (frame >= tScene8 && frame < tScene9) {
    // Scene 8
    const localFrame = frame - tScene8;
    const slideBack = spring({ frame: localFrame - 60, fps, config: { damping: 20 } });
    const slideForward = spring({ frame: localFrame - 240, fps, config: { damping: 20 } });

    let effectiveVersion = 5;
    if (slideBack > 0.5 && slideForward < 0.5) effectiveVersion = 2;

    dataFiles = [
      f0,
      { ...f1, status: effectiveVersion >= 5 ? "removed" : "active" },
      f2, f3,
      { ...f5, status: effectiveVersion >= 3 ? "active" : "removed" },
      { ...f6, status: effectiveVersion >= 3 ? "active" : "removed" },
      { ...f7, status: effectiveVersion >= 4 ? "active" : "removed" },
      { ...f8, status: effectiveVersion >= 5 ? "active" : "removed" }
    ];
    logChips = [l0, l1, l2, l3, l4, l5];
    version = effectiveVersion;
    activeCount = dataFiles.filter(f => f.status === "active").length;
    note = effectiveVersion === 2 ? "Time traveling to past state" : "Current state";
  } else if (frame >= tScene9 && frame < tScene10) {
    // Scene 9
    const localFrame = frame - tScene9;
    const appendFrame = Math.max(0, localFrame - 30);
    const fastAppends = Math.min(5, Math.floor(appendFrame / 10));
    const sweep = spring({ frame: localFrame - 120, fps, config: { durationInFrames: 60 } });
    const checkpoint = spring({ frame: localFrame - 200, fps });

    dataFiles = [f0, { ...f1, status: "removed" }, f2, f3, f5, f6, f7, f8];
    logChips = [l0, l1, l2, l3, l4, l5];

    for (let i = 0; i < fastAppends; i++) {
      dataFiles.push({ id: `f${9+i}`, name: `part-00${9+i}`, status: "active" });
      logChips.push({ id: `l${6+i}`, name: `00${6+i}.json`, status: "committed" });
    }
    if (checkpoint > 0.1) logChips.push({ id: "cp", name: "010.checkpoint.parquet", status: "checkpoint" });

    version = 5 + fastAppends;
    activeCount = 7 + fastAppends;
    note = checkpoint > 0.1 ? "Readers start directly from summary" : (sweep > 0.1 ? "Reading all log entries is getting slow..." : "Writing small appends...");
  } else if (frame >= tScene10 && frame < tScene11) {
    // Scene 10
    const localFrame = frame - tScene10;
    const optimizeStart = spring({ frame: localFrame - 60, fps });
    const optimizeCommit = spring({ frame: localFrame - 180, fps });

    const startingFiles = Array.from({ length: 12 }, (_, i) => ({
      id: `small-${i}`, name: `part-0${11+i}`, status: optimizeCommit > 0.1 ? "removed" as const : "active" as const
    }));

    dataFiles = startingFiles;
    if (optimizeStart > 0.1) {
      dataFiles.push({ id: "L1", name: "large-A-F", status: optimizeCommit > 0.1 ? "large" : "writing", stats: optimizeCommit > 0.1 });
      dataFiles.push({ id: "L2", name: "large-G-M", status: optimizeCommit > 0.1 ? "large" : "writing", stats: optimizeCommit > 0.1 });
      dataFiles.push({ id: "L3", name: "large-N-S", status: optimizeCommit > 0.1 ? "large" : "writing", stats: optimizeCommit > 0.1 });
      dataFiles.push({ id: "L4", name: "large-T-Z", status: optimizeCommit > 0.1 ? "large" : "writing", stats: optimizeCommit > 0.1 });
    }
    logChips = [{ id: "cp", name: "010.checkpoint.parquet", status: "checkpoint" }];
    if (optimizeCommit > 0.1) logChips.push({ id: "l11", name: "011.json", status: "committed" });

    version = optimizeCommit > 0.1 ? 11 : 10;
    activeCount = optimizeCommit > 0.1 ? 4 : 12;
    note = optimizeCommit > 0.1 ? "12 small files → 4 large, Z-Ordered files" : (optimizeStart > 0.1 ? "Bin-packing and Z-Ordering..." : "Many small files slowing reads...");
  } else if (frame >= tScene11 && frame < tScene12) {
    // Scene 11
    const localFrame = frame - tScene11;
    const queryStart = spring({ frame: localFrame - 30, fps });
    const sweep = spring({ frame: localFrame - 90, fps, config: { durationInFrames: 60 } });

    const isSkipped = (fileRange: string) => sweep > 0.5 && fileRange !== "G-M";
    const isRead = (fileRange: string) => sweep > 0.5 && fileRange === "G-M";

    dataFiles = [
      { id: "L1", name: "large-A-F", status: isSkipped("A-F") ? "removed" : "large", stats: true },
      { id: "L2", name: "large-G-M", status: "large", highlight: isRead("G-M"), stats: true },
      { id: "L3", name: "large-N-S", status: isSkipped("N-S") ? "removed" : "large", stats: true },
      { id: "L4", name: "large-T-Z", status: isSkipped("T-Z") ? "removed" : "large", stats: true },
    ];
    logChips = [
      { id: "cp", name: "010.checkpoint.parquet", status: "checkpoint" },
      { id: "l11", name: "011.json", status: "committed" }
    ];

    version = 11;
    activeCount = sweep > 0.5 ? 1 : 4;
    note = sweep > 0.5 ? "Scanned 1 of 4 files" : (queryStart > 0.1 ? "Reading transaction log stats..." : "Waiting for query...");
  } else if (frame >= tScene12) {
    // Scene 12
    dataFiles = [];
    logChips = [];
    version = 11;
    activeCount = 4;
    note = "";
  }

  return { dataFiles, logChips, version, activeCount, note, tScene3, tScene12 };
};
