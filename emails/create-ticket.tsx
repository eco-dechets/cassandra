import {
    Body,
    Container,
    Head,
    Heading, Hr,
    Html,
    Img,
    Link,
    Preview,
    Text,
} from "@react-email/components";
import * as React from "react";
import {Tailwind} from "@react-email/tailwind";


interface TicketEmailProps{
    lastName?: string;
    description?: string;

}

function CreateTicketEmail({lastName, description}: TicketEmailProps) {
    return (
        <Tailwind>
            <Html>
            <Head/>
            <Body>
                <Container>
                    <Heading>
                        Creation d&apos;un ticket
                    </Heading>
                    <Text>
                        Bonjour {lastName}, un ticket a été créé pour vous.
                    </Text>

                    <Text>
                        Votre ticket sera traité dans les plus brefs délais.
                    </Text>

                    <Text>
                        Détails de la demande: {description}
                    </Text>

                    <Text style={paragraph}>— Support éco.Déchets</Text>

                     <Hr />

                    <Text style={footer}>
                        Cordialement, l&apos;équipe de support.
                    </Text>
                </Container>
            </Body>
        </Html>
        </Tailwind>

    );
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

export default CreateTicketEmail;