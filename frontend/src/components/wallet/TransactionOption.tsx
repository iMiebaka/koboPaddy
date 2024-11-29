import { useState } from "react";
import CreditModal from "./CreditModal";
import WithdrawModal from "./WithdrawModal";

export default function TransactionOption() {
  const [walletModal, setWalletModal] = useState({
    credit: false,
    transfer: false,
  });

  const toggleWalletModal = () => {
    setWalletModal((pre) => ({ ...pre, credit: !pre.credit }));
  };

  const toggleWithdrawModal = () => {
    setWalletModal((pre) => ({ ...pre, transfer: !pre.transfer }));
  };

  return (
    <>
      {walletModal.credit && (
        <CreditModal toggleWalletModal={toggleWalletModal} />
      )}
      {walletModal.transfer && (
        <WithdrawModal toggleWithdrawModal={toggleWithdrawModal} />
      )}
      <div className="flex justify-between">
        <h3 className="text-3xl font-medium text-gray-700">Wallet</h3>
        <div className="flex gap-1">
          <button
            onClick={toggleWalletModal}
            className="bg-green-400 text-white p-2 rounded-md"
          >
            Credit Wallet
          </button>
          <button
            onClick={toggleWithdrawModal}
            className="bg-gray-100 border p-2 rounded-md"
          >
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
}
