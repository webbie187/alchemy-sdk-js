import { AlchemyConfig, Network } from '../types/types';
import {
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_MAX_RETRIES,
  DEFAULT_NETWORK,
  getAlchemyHttpUrl,
  getAlchemyNftHttpUrl
} from '../util/const';
import type { AlchemyWebSocketProvider } from './alchemy-websocket-provider';
import type { AlchemyProvider } from './alchemy-provider';

/**
 * Entry point into the Alchemy SDK.
 *
 * @param config - Configuration object for the Alchemy SDK
 * @public
 */
export function initializeAlchemy(config?: AlchemyConfig): Alchemy {
  return new Alchemy(config);
}

/**
 * The Alchemy SDK client. This class holds config information and must be
 * passed into SDK methods.
 *
 * Do not call this constructor directly. Instead, use {@link initializeAlchemy}
 * to get an instance of the SDK.
 *
 * @public
 */
export class Alchemy {
  readonly apiKey: string;
  network: Network;
  readonly maxRetries: number;

  /** @internal */
  private _baseAlchemyProvider: AlchemyProvider | undefined;

  /** @internal */
  private _baseAlchemyWssProvider: AlchemyWebSocketProvider | undefined;

  /**
   * @hideconstructor
   * @internal
   */
  constructor(config?: AlchemyConfig) {
    this.apiKey = config?.apiKey || DEFAULT_ALCHEMY_API_KEY;
    this.network = config?.network || DEFAULT_NETWORK;
    this.maxRetries = config?.maxRetries || DEFAULT_MAX_RETRIES;
  }

  /** @internal */
  getBaseUrl(): string {
    return getAlchemyHttpUrl(this.network, this.apiKey);
  }

  /** @internal */
  getNftUrl(): string {
    return getAlchemyNftHttpUrl(this.network, this.apiKey);
  }

  /**
   * Creates an AlchemyProvider instance. Only one provider is created per
   * Alchemy instance.
   *
   * @public
   */
  async getProvider(): Promise<AlchemyProvider> {
    if (!this._baseAlchemyProvider) {
      const { AlchemyProvider } = await import('./alchemy-provider');
      this._baseAlchemyProvider = new AlchemyProvider(
        this.network,
        this.apiKey,
        this.maxRetries
      );
    }
    return this._baseAlchemyProvider;
  }

  /**
   * Creates an AlchemyWebsocketProvider instance. Only one provider is created
   * per Alchemy instance.
   *
   * @public
   */
  async getWebsocketProvider(): Promise<AlchemyWebSocketProvider> {
    if (!this._baseAlchemyWssProvider) {
      const { AlchemyWebSocketProvider } = await import(
        './alchemy-websocket-provider'
      );
      this._baseAlchemyWssProvider = new AlchemyWebSocketProvider(
        this.network,
        this.apiKey
      );
    }
    return this._baseAlchemyWssProvider;
  }
}
