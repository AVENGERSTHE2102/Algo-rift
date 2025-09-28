import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Thermometer, 
  Droplets, 
  Activity,
  TrendingUp,
  MapPin,
  Clock,
  Bot,
  User,
  Sparkles,
  Waves
} from 'lucide-react';
import { mockChatResponses } from '@/lib/mockData';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: unknown;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your ARGO data assistant. I can help you analyze oceanographic data, find specific measurements, and answer questions about float operations. What would you like to know?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAIResponse = (query: string) => {
    return new Promise<{ text: string; data: unknown }>((resolve) => {
      setTimeout(() => {
        const response = findResponse(query);
        resolve(response);
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await getAIResponse(inputValue.toLowerCase());

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.text,
        timestamp: new Date(),
        data: response.data,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError('Failed to get AI response. Please try again.');
    }

    setIsLoading(false);
  };

  const responseRules = [
    {
      keywords: ['salinity', 'profile'],
      response: mockChatResponses["salinity profiles near equator"],
    },
    {
      keywords: ['bgc', 'oxygen', 'arabian'],
      response: mockChatResponses["bgc parameters arabian sea"],
    },
    {
      keywords: ['nearest', 'close'],
      response: mockChatResponses["nearest floats"],
    },
  ];

  const findResponse = (query: string) => {
    for (const rule of responseRules) {
      if (rule.keywords.some((keyword) => query.includes(keyword))) {
        return rule.response;
      }
    }
    return {
      text: "I can help you with ARGO float data analysis. Try asking about salinity profiles, BGC parameters, or finding the nearest floats to a location.",
      data: null,
    };
  };

  const quickActions = [
    {
      label: 'Salinity Profiles',
      icon: Droplets,
      query: 'Show me salinity profiles near equator',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      label: 'Temperature Data',
      icon: Thermometer,
      query: 'Get temperature measurements from Arabian Sea',
      color: 'bg-orange-50 text-orange-700 border-orange-200'
    },
    {
      label: 'BGC Parameters',
      icon: Activity,
      query: 'Show BGC parameters in Arabian Sea',
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      label: 'Nearest Floats',
      icon: MapPin,
      query: 'Find nearest floats to my location',
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm">
              <img 
                src="/workspace/uploads/Gemini_Generated_Image_6lyq3x6lyq3x6lyq.png" 
                alt="Float Chat" 
                className="h-6 w-6 rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                }}
              />
              <Waves className="h-5 w-5 text-blue-600 hidden" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Chat Assistant</h1>
              <p className="text-gray-600 mt-1">
                Ask questions about ARGO float data and oceanographic measurements
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <Bot className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-auto p-4 flex-col space-y-2 ${action.color} hover:shadow-md transition-all duration-200`}
                    onClick={() => setInputValue(action.query)}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-medium text-center leading-tight">
                      {action.label}
                    </span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="flex-1">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-br from-purple-500 to-indigo-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.data && (
                        <div className="mt-3 p-3 bg-white/10 rounded-lg">
                          <p className="text-xs opacity-75 mb-2">Related Data:</p>
                          <div className="text-xs space-y-1">
                            <p>• {message.data.length} data points found</p>
                            <p>• Analysis complete</p>
                          </div>
                        </div>
                      )}
                      <p className="text-xs opacity-75 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about ARGO data, salinity profiles, temperature measurements..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Real-time analysis</span>
                </span>
                <span className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>AI-powered insights</span>
                </span>
              </div>
              <span>{inputValue.length}/500</span>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </CardContent>
        </Card>
      </div>
  );
}