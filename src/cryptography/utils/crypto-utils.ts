import { hmac } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha256";
import { sha512 } from '@noble/hashes/sha512';
import { ripemd160 } from '@noble/hashes/ripemd160';
import { utf8ToBytes, randomBytes } from "@noble/hashes/utils";
import { pbkdf2, pbkdf2Async } from "@noble/hashes/pbkdf2";

import { base58check } from "micro-base";
import { TypeUtils, Hex } from "@/utils";

const base58c = base58check(sha256);

/**
 * Provide utilities to due with cryptography
 */
export class CryptoUtils {

  /**
   * Hash the data based on sha512 with a key, produce 2 parts key and chain-code.
   * @param data 
   * @param key 
   * @returns 
   */
  static digestSHA512(data: Uint8Array, key: Uint8Array) {
    const I = hmac(sha512, key, data);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
      key: IL,
      chainCode: IR
    }
  }

  /**
   * SHA256 hashing operation
   * @param data 
   * @returns 
   */
  static hash256(data: Uint8Array): Uint8Array {
    return sha256(data);
  }

  /**
   * 160-bit cryptographic hash
   * @param data 
   * @returns 
   */
  static hash160(data: Uint8Array): Uint8Array {
    return ripemd160(sha256(data));
  }

  /**
   * Public key cryptography standards
   * @param password 
   * @param salt 
   * @param iterations 
   * @param keySize 
   * @returns 
   */
  static pbkdf2Sync(password: Uint8Array, salt: Uint8Array, iterations: number, keySize: number): Uint8Array {
    return pbkdf2(sha512, password, salt, { c: iterations, dkLen: keySize });
  }

  /**
   * Public key cryptography standards in async mode
   * @param password 
   * @param salt 
   * @param iterations 
   * @param keySize 
   * @returns 
   */
  static pbkdf2(password: Uint8Array, salt: Uint8Array, iterations: number, keySize: number): Promise<Uint8Array> {
    return pbkdf2Async(sha512, password, salt, { c: iterations, dkLen: keySize });
  }

  static parseToArray(input: Hex): Uint8Array {
    if (TypeUtils.isString(input)) {
      return TypeUtils.convertHexStringToArray(input as string);
    }
    return input as Uint8Array;
  }

  static randomBytes(len: number): Uint8Array {
    return randomBytes(len);
  }

  static base58Encode(data: Uint8Array) {
    return base58c.encode(data);
  }

  static convertUt8ToByteArray(input: string): Uint8Array {
    return utf8ToBytes(input);
  }
}
