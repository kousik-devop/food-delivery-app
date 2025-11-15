import { UserProvider } from "./UserContext";
import { PartnerProvider } from "./PartnerContext";
import { FoodProvider } from "./FoodContext";
// in future: import { ThemeProvider } from "./ThemeContext"; etc.

export const GlobalProvider = ({ children }) => {
  return (
    <UserProvider>
      <PartnerProvider>
        <FoodProvider>
          {children}
        </FoodProvider>
      </PartnerProvider>
    </UserProvider>
  );
};
