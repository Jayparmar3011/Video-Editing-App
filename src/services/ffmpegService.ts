
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();

let loaded = false;

async function loadFFmpeg() {
    if (!loaded) {
        await ffmpeg.load();
        loaded = true;
    }
}

async function trimVideo(
    file: File,
    start: number,
    end: number
): Promise<string> {
    await loadFFmpeg();

    await ffmpeg.writeFile("input.mp4", await fetchFile(file));

    await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-ss",
        `${start}`,
        "-to",
        `${end}`,
        "-c:v",
        "libx264",
        "-preset",
        "ultrafast",
        "trimmed.mp4",
    ]);

    const data = await ffmpeg.readFile("trimmed.mp4");

    const blob = new Blob([data], { type: "video/mp4" });

    return URL.createObjectURL(blob);
}

async function exportVideo(
    file: File,
    format: "mp4" | "webm"
): Promise<void> {
    await loadFFmpeg();

    const inputName =
        format === "webm" ? "input.webm" : "input.mp4";

    const outputName = `exported.${format}`;

    await ffmpeg.writeFile(inputName, await fetchFile(file));

    await ffmpeg.exec(["-i", inputName, outputName]);

    const data = await ffmpeg.readFile(outputName);

    const blob = new Blob([data], {
        type: format === "webm" ? "video/webm" : "video/mp4",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = outputName;
    a.click();

    URL.revokeObjectURL(url);
}

async function addOverlayToVideo(
    file: File,
    overlayImage: string
): Promise<string> {
    await loadFFmpeg();

    await ffmpeg.writeFile("input.mp4", await fetchFile(file));

    const blob = await fetch(overlayImage).then((r) => r.blob());

    await ffmpeg.writeFile(
        "overlay.png",
        new Uint8Array(await blob.arrayBuffer())
    );

    await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-i",
        "overlay.png",
        "-filter_complex",
        "overlay=10:10",
        "output.mp4",
    ]);

    const data = await ffmpeg.readFile("output.mp4");

    const blobOut = new Blob([data], { type: "video/mp4" });

    return URL.createObjectURL(blobOut);
}

async function addAudioToVideo(
    videoFile: File,
    audioFile: File,
    volume: number
): Promise<string> {
    await loadFFmpeg();

    try {
        await ffmpeg.deleteFile(
            'video.mp4'
        );
        await ffmpeg.deleteFile(
            'audio.mp3'
        );
        await ffmpeg.deleteFile(
            'output.mp4'
        );
    } catch { }

    await ffmpeg.writeFile(
        'video.mp4',
        await fetchFile(
            videoFile
        )
    );

    await ffmpeg.writeFile(
        'audio.mp3',
        await fetchFile(
            audioFile
        )
    );

    await ffmpeg.exec([
        '-i',
        'video.mp4',
        '-i',
        'audio.mp3',

        '-filter:a',
        `volume=${volume}`,

        '-map',
        '0:v',

        '-map',
        '1:a',

        '-c:v',
        'copy',

        '-c:a',
        'aac',

        '-shortest',

        'output.mp4',
    ]);

    const data =
        await ffmpeg.readFile(
            'output.mp4'
        );

    const blob =
        new Blob([data], {
            type: 'video/mp4',
        });

    return URL.createObjectURL(
        blob
    );
}

async function exportFinalVideo(
  file: File,
  format: 'mp4' | 'webm'
): Promise<void> {
  await loadFFmpeg();

  const inputName =
    file.name.endsWith('.webm')
      ? 'input.webm'
      : 'input.mp4';

  const outputName =
    `exported.${format}`;

  try {
    await ffmpeg.deleteFile(
      inputName
    );
    await ffmpeg.deleteFile(
      outputName
    );
  } catch {}

  await ffmpeg.writeFile(
    inputName,
    await fetchFile(file)
  );

  if (
    format === 'mp4' &&
    inputName === 'input.mp4'
  ) {
    await ffmpeg.exec([
      '-i',
      inputName,
      '-c',
      'copy', 
      outputName,
    ]);
  } else {
    await ffmpeg.exec([
      '-i',
      inputName,
      outputName,
    ]);
  }

  const data =
    await ffmpeg.readFile(
      outputName
    );

  const blob =
    new Blob([data], {
      type:
        format === 'webm'
          ? 'video/webm'
          : 'video/mp4',
    });

  const url =
    URL.createObjectURL(
      blob
    );

  const a =
    document.createElement(
      'a'
    );

  a.href = url;
  a.download =
    outputName;
  a.click();

  URL.revokeObjectURL(
    url
  );
}

export default {
    trimVideo,
    exportVideo,
    addOverlayToVideo,
    addAudioToVideo,
    exportFinalVideo,
};

