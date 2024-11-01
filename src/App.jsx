import  { useState } from 'react';
import PropTypes from 'prop-types';
import { generateMnemonic } from "bip39";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ initialMnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const [mnemonic, setMnemonic] = useState(initialMnemonic || "");

  const mnemonicWords = mnemonic ? mnemonic.split(" ") : [];
  const totalWords = 12; 

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-3 gap-2 mt-12 mb-4">
        {[...Array(totalWords)].map((_, index) => (
          <div
            key={index}
            className={`p-2 border rounded-md text-center ${mnemonicWords[index] ? '' : 'h-10 w-20'}`}
          >
            <span className="text-xs text-gray-500 mr-2">{index + 1}</span>
            {mnemonicWords[index] || ''}
          </div>
        ))}
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={async function() {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md"
        onClick={function() {
          if (!mnemonic) return; // Prevent adding wallet without a mnemonic
          const seed = mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey]);
        }}
      >
        Add wallet
      </button>

      {publicKeys.map(p => (
        <div key={p.toBase58()} className="text-sm text-gray-700">
          {p.toBase58()}
        </div>
      ))}
    </div>
  );
}

SolanaWallet.propTypes = {
  initialMnemonic: PropTypes.string,
};

export default SolanaWallet;