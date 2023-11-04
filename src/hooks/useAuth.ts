import { useAppContext } from "@/contexts/AppContext";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
export function useAuth() {
  const { setAddress, setIsConnected } = useAppContext();
  const { address, isConnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector({}),
  });

  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      if (isConnected) {
        await handleDisconnect();
      }
      await connect();
      setAddress(address ?? "");
      setIsConnected(isConnected);
    } catch (err) {
      console.log("Hata var => " + err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsConnected(false);
      setAddress(address ?? "");
    } catch (err) {
      console.log("Hata var => " + err);
    }
  };

  return {
    handleConnect,
    handleDisconnect,
  };
}
