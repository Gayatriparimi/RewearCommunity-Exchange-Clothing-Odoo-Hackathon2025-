import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Terms of Service</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p><em>Last Updated: July 22, 2024</em></p>

        <h2>1. Agreement to Terms</h2>
        <p>By using the ReWear platform, you agree to be bound by these Terms of Service. If you do not agree to these Terms, do not use the service.</p>

        <h2>2. User Conduct</h2>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>List items that are not your own or that you do not have the right to trade.</li>
          <li>Misrepresent the condition or authenticity of any item.</li>
          <li>Engage in any fraudulent activity, including failing to ship an item after a swap is agreed upon.</li>
          <li>Harass, abuse, or harm another person.</li>
        </ul>

        <h2>3. Swaps and Points</h2>
        <p>ReWear is a platform to facilitate swaps. We are not a party to any transaction between users. All swaps are made at your own risk. We are not responsible for the condition of items, shipping, or any disputes between users.</p>

        <h2>4. Termination</h2>
        <p>We may terminate or suspend your account at any time, without prior notice or liability, for any reason, including if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>

        <h2>5. Governing Law</h2>
        <p>These Terms shall be governed by the laws of the State of New York, without regard to its conflict of law provisions.</p>
        
        <h2>6. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. We will provide notice of changes by posting the new terms on the site. Your continued use of the service after such changes constitutes your acceptance of the new terms.</p>
      </CardContent>
    </Card>
  );
}
