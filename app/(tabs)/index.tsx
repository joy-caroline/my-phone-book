import ContactCard from "@/components/ContactCard";
import EmptyContacts from "@/components/EmptyContacts";

export default function HomeScreen() {
  const contacts = [];
  const hasContact = [
    { name: "John" },
    { name: "Luisa" },
    { name: " Doe" },
    { name: "Sophia" },
  ];

  const renderContacts = () => {
    hasContact ? (
      hasContact.map((contact) => <ContactCard contact={contact.name} />)
    ) : (
      <EmptyContacts />
    );
  };

  return <>{renderContacts()}</>;
}
