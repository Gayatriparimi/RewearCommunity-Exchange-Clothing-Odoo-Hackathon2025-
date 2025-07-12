import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p><em>Last Updated: July 22, 2024</em></p>
        
        <h2>1. Introduction</h2>
        <p>Welcome to ReWear! We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>

        <h2>2. Information We Collect</h2>
        <p>We may collect personal information such as:</p>
        <ul>
          <li><strong>Personal Data:</strong> Name, email address, password, mailing address.</li>
          <li><strong>Usage Data:</strong> Information your browser sends whenever you visit our Service.</li>
          <li><strong>Item Data:</strong> Photos and descriptions of clothing you upload.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Facilitate clothing swaps between users.</li>
          <li>Notify you about updates to our services.</li>
          <li>Monitor and analyze usage and trends to improve your experience.</li>
        </ul>

        <h2>4. Sharing Your Information</h2>
        <p>We do not sell your personal data. We may share information with other users only when necessary to complete a swap (e.g., sharing shipping addresses after a swap is confirmed).</p>

        <h2>5. Security</h2>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

        <h2>6. Contact Us</h2>
        <p>If you have questions or comments about this Privacy Policy, please contact us at <a href="mailto:privacy@rewear.example.com">privacy@rewear.example.com</a>.</p>
      </CardContent>
    </Card>
  );
}
