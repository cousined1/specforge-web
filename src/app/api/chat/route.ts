import { NextRequest, NextResponse } from 'next/server';

const SALES_BOT_PROMPT = `You are SpecGetter's AI sales assistant. Your job is to help visitors understand SpecGetter's software provenance and governance platform.

Key capabilities to mention:
- AI-generated code detection and tracking
- Open-source license compliance scanning
- Software supply chain risk mapping
- Policy enforcement and governance rules
- Integration with Git workflows and CI/CD pipelines

Pricing:
- Starter: $49/month (up to 10 team members, 5 repos)
- Team: $199/month (up to 50 team members, unlimited repos)
- Enterprise: Custom pricing (unlimited everything, SSO, dedicated support)

Company info:
- SpecGetter is by Developer312, a subsidiary of NIGHT LITE USA LLC
- Contact: hello@developer312.com, (510) 401-1225

Be helpful, professional, and try to qualify leads by understanding their needs. If they seem interested, suggest signing up for a free trial or contacting sales.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = generateResponse(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

function generateResponse(message: string) {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('pricing')) {
    return `Our pricing is straightforward:

🚀 **Starter** - $49/month
- Up to 10 team members
- 5 repositories
- Basic provenance tracking
- Email support

👥 **Team** - $199/month  
- Up to 50 team members
- Unlimited repositories
- Policy enforcement
- Priority support

🏢 **Enterprise** - Custom
- Unlimited everything
- SSO/SAML
- Dedicated engineer
- Custom integrations

Would you like to start a free trial?`;
  }

  if (lowerMsg.includes('feature') || lowerMsg.includes('what') || lowerMsg.includes('do')) {
    return `SpecGetter helps engineering teams with:

1. **AI Code Detection** - Track which code was AI-generated
2. **OSS Risk Mapping** - Identify license conflicts and vulnerabilities  
3. **Policy Enforcement** - Define governance rules for your codebase
4. **Audit Trails** - Complete provenance history for compliance
5. **CI/CD Integration** - Works with your existing Git workflows

Which capability interests you most?`;
  }

  if (lowerMsg.includes('contact') || lowerMsg.includes('sales') || lowerMsg.includes('demo')) {
    return `I'd be happy to connect you with our team!

📧 Email: hello@developer312.com
📞 Phone: (510) 401-1225

Or you can [request a demo](/request-demo/) and our sales team will reach out within 24 hours.

Would you like me to help you get started with a free trial in the meantime?`;
  }

  if (lowerMsg.includes('trial') || lowerMsg.includes('start') || lowerMsg.includes('sign up')) {
    return `Great choice! You can start your free trial right away - no credit card required.

Just visit our [signup page](/signup/) and you'll be up and running in minutes.

During the trial, you'll get full access to:
- AI-generated code detection
- Open-source license scanning
- Basic policy enforcement
- Up to 3 repositories

Need help getting set up? I can connect you with our onboarding team.`;
  }

  return `Thanks for your interest in SpecGetter! I'm here to help you understand our software provenance and governance platform.

I can tell you about:
- Our features and capabilities
- Pricing plans
- How to get started with a free trial
- Connecting you with our sales team

What would you like to know?`;
}
