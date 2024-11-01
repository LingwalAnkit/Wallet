# Solana Wallet Component

A React component for generating and managing Solana wallets with seed phrase functionality. This component allows users to create new seed phrases and derive multiple wallet addresses from a single mnemonic.

## Features

- Generate 12-word BIP39 mnemonic seed phrases
- Derive multiple Solana wallet addresses from a single seed phrase
- Display seed phrase words in a grid layout
- Support for custom initial mnemonic through props
- Visual feedback for wallet generation process
- Display generated public keys in Base58 format

## Prerequisites

Before using this component, ensure you have the following dependencies installed:

```bash
npm install bip39 ed25519-hd-key @solana/web3.js tweetnacl prop-types
```

## Installation

1. Copy the `SolanaWallet` component into your React project
2. Install the required dependencies
3. Import and use the component in your application

## Usage

```jsx
import { SolanaWallet } from './path/to/SolanaWallet';

// Basic usage
function App() {
  return (
    <SolanaWallet />
  );
}

// With initial mnemonic
function App() {
  const savedMnemonic = "your twelve word mnemonic phrase goes here";
  return (
    <SolanaWallet initialMnemonic={savedMnemonic} />
  );
}
```

## Props

| Prop | Type | Description | Required |
|------|------|-------------|----------|
| initialMnemonic | string | Initial seed phrase to load | No |

## Component Structure

- Grid display of 12 mnemonic words
- "Create Seed Phrase" button to generate new mnemonics
- "Add Wallet" button to derive new wallet addresses
- List of generated public keys

## Technical Details

### Derivation Path

The component uses the following derivation path format:
```
m/44'/501'/${index}'/0'
```
- 44' - BIP44 purpose
- 501' - Solana's coin type
- index' - Incremental account index
- 0' - Change index

### Key Generation Process

1. Generates or accepts a BIP39 mnemonic
2. Converts mnemonic to seed
3. Derives ED25519 key using HD wallet path
4. Creates Solana keypair from derived seed
5. Extracts and displays public key

## Styling

The component uses Tailwind CSS classes for styling. Ensure you have Tailwind CSS configured in your project for proper rendering.

## Development

To modify the component:

1. Update the derivation path if needed
2. Customize the styling by modifying Tailwind classes
3. Add error handling as needed
4. Implement additional wallet features

## Dependencies

- react
- prop-types
- bip39
- ed25519-hd-key
- @solana/web3.js
- tweetnacl


## Contributing

Feel free to submit issues and enhancement requests.

## Support

For questions and support, please open an issue in the repository.
