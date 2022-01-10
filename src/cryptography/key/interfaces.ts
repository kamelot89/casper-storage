import { Hex } from "@/utils";

export interface IAsymmetricKey {

  /**
   * Generate a random private key
   * @returns a random array value
   */
  generatePrivateKey(): Promise<Uint8Array>;

  /**
   * Create the public-key from a specific private key
   * @param privateKey 
   * @param isCompessed 
   */
  createPublicKey(privateKey: Hex, isCompessed?: boolean): Promise<Uint8Array>;

  /**
   * Sign the message by using the keypair
   * @param privateKey 
   * @param msg 
   */
  sign(privateKey: Hex, msg: Uint8Array): Promise<Uint8Array>;

  /**
   * Tweat the public key by adding the private key
   * @param publicKey 
   * @param tweak 
   * @param compressed 
   */
  publicKeyTweakAdd(publicKey: Hex, tweak: Hex, compressed?: boolean): Promise<Uint8Array>;
}