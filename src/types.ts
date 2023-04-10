import { Accessor, Resource } from "solid-js";
import { Store } from "solid-js/store";

export interface IDelete {
  key: string;
  userId: string;
  apiKey: string;
  apiUrl?: string;
}

export interface ISet extends IDelete {
  value: string;
}

export type LanyardFetchSingle = Resource<LanyardResponse>;
export type LanyardFetchMultiple = Resource<LanyardResponse[]>;

export interface LanyardWebsocket {
  loading: Accessor<boolean>;
  status?: Store<LanyardData>;
  websocket?: Accessor<WebSocket>;
}

export type LanyardGeneric<T> = T extends { socket: true }
  ? LanyardWebsocket
  : T extends { userId: string }
  ? LanyardFetchSingle
  : T extends { userId: string[] }
  ? LanyardFetchMultiple
  : never;

/**
 * Special thanks to @eggsy
 * https://github.com/eggsy/vue-lanyard/blob/main/%40types/lanyard.d.ts
 */

export interface LanyardOptions {
  userId: string | string[];
  socket?: boolean;
  apiUrl?: string;
}

export interface LanyardResponse {
  loading: boolean;
  success: boolean;
  data: LanyardData;
  error?: LanyardError;
}

export interface LanyardError {
  message: string;
  code: string;
}

export interface LanyardData {
  spotify?: Spotify;
  listening_to_spotify: boolean;
  discord_user: DiscordUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  kv?: Kv;
  activities: Activity[];
  active_on_discord_web: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
}

export interface Kv {
  [key: string]: string;
}

export interface Spotify {
  track_id: string;
  timestamps: Timestamps;
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface Timestamps {
  start: number;
  end: number;
}

export interface Activity {
  type: number;
  state: string;
  name: string;
  id: string;
  flags?: number;
  emoji?: Emoji;
  created_at: number;
  application_id?: string;
  timestamps?: Timestamps;
  sync_id?: string;
  session_id?: string;
  party?: Party;
  details?: string;
  buttons?: string[];
  assets?: Assets;
}

export interface Party {
  id: string;
  size?: PartySize;
}

export interface PartySize {
  current_size: number;
  max_size: number;
}

export interface Assets {
  small_text: string;
  small_image: string;
  large_text: string;
  large_image: string;
}

export interface Timestamps {
  start: number;
}

export interface Emoji {
  name: string;
  id?: string;
  animated?: boolean;
}

export interface DiscordUser {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  bot: boolean;
  avatar: string;
}
