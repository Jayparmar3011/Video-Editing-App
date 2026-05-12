import { v4 as uuid } from 'uuid';

export interface VideoClip {
  id: string;
  start: number;
  end: number;
}

export interface EditorState {
  videoFile: File | null;
  videoUrl: string;
  clips: VideoClip[];
  currentTime: number;
  duration: number;
  filter: string;
  speed: number;
  activeTool: string;

  audioFile: File | null;
  audioVolume: number;
  audioFadeIn: number;
  audioFadeOut: number;
}

const initialState: EditorState = {
  videoFile: null,
  videoUrl: '',
  clips: [],
  currentTime: 0,
  duration: 0,
  filter: '',
  speed: 1,
  activeTool: 'trim',

  audioFile: null,
  audioVolume: 1,
  audioFadeIn: 0,
  audioFadeOut: 0,
};

const SET_VIDEO = 'SET_VIDEO';
const SET_TIME = 'SET_TIME';
const SET_DURATION = 'SET_DURATION';
const SET_FILTER = 'SET_FILTER';
const SET_SPEED = 'SET_SPEED';
const ADD_CLIP = 'ADD_CLIP';
const SPLIT_CLIP = 'SPLIT_CLIP';
const SET_ACTIVE_TOOL = 'SET_ACTIVE_TOOL';
const UPDATE_VIDEO_URL = 'UPDATE_VIDEO_URL';
const SET_AUDIO = 'SET_AUDIO';


export const setAudio = (payload: {
  file: File;
  volume: number;
  fadeIn: number;
  fadeOut: number;
}) => ({
  type: SET_AUDIO,
  payload,
});

export const updateVideoUrl = (
  url: string
) => ({
  type: UPDATE_VIDEO_URL,
  payload: url,
});

export const setActiveTool = (
  tool: string
) => ({
  type: SET_ACTIVE_TOOL,
  payload: tool,
});

export const setVideo = (
  file: File,
  url: string
) => ({
  type: SET_VIDEO,
  payload: { file, url },
});

export const setTime = (
  time: number
) => ({
  type: SET_TIME,
  payload: time,
});

export const setDuration = (
  duration: number
) => ({
  type: SET_DURATION,
  payload: duration,
});

export const setFilter = (
  filter: string
) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setSpeed = (
  speed: number
) => ({
  type: SET_SPEED,
  payload: speed,
});

export const addClip = (
  start: number,
  end: number
) => ({
  type: ADD_CLIP,
  payload: {
    id: uuid(),
    start,
    end,
  },
});

export const splitClip = (
  time: number
) => ({
  type: SPLIT_CLIP,
  payload: time,
});


export default function editorReducer(
  state = initialState,
  action: any
): EditorState {
  switch (action.type) {
    case SET_VIDEO:
      return {
        ...state,
        videoFile:
          action.payload.file,
        videoUrl:
          action.payload.url,
      };

    case SET_TIME:
      return {
        ...state,
        currentTime:
          action.payload,
      };

    case SET_DURATION:
      return {
        ...state,
        duration:
          action.payload,
      };

    case SET_FILTER:
      return {
        ...state,
        filter:
          action.payload,
      };

    case SET_SPEED:
      return {
        ...state,
        speed:
          action.payload,
      };

    case ADD_CLIP:
      return {
        ...state,
        clips: [
          ...state.clips,
          action.payload,
        ],
      };

    case SPLIT_CLIP:
      return {
        ...state,
        clips: [
          ...state.clips,
          {
            id: uuid(),
            start: 0,
            end: action.payload,
          },
          {
            id: uuid(),
            start:
              action.payload,
            end:
              state.duration,
          },
        ],
      };

    case SET_ACTIVE_TOOL:
      return {
        ...state,
        activeTool:
          action.payload,
      };

    case UPDATE_VIDEO_URL:
      return {
        ...state,
        videoUrl:
          action.payload,
      };

    case SET_AUDIO:
      return {
        ...state,
        audioFile:
          action.payload.file,
        audioVolume:
          action.payload.volume,
        audioFadeIn:
          action.payload.fadeIn,
        audioFadeOut:
          action.payload.fadeOut,
      };

    default:
      return state;
  }
}