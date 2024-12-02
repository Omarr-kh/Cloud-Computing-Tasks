import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class Topic {
  final String id;
  final String name;
  final String description;
  final IconData icon;
  bool isSubscribed;

  Topic({
    required this.id,
    required this.name,
    required this.description,
    required this.icon,
    this.isSubscribed = false,
  });
}

class TopicsPage extends StatefulWidget {
  const TopicsPage({Key? key}) : super(key: key);

  @override
  State<TopicsPage> createState() => _TopicsPageState();
}

class _TopicsPageState extends State<TopicsPage> {
  final List<Topic> topics = [
    Topic(
      id: 'football',  // Changed to lowercase, no spaces for topic IDs
      name: 'Football',
      description: 'Latest football news and updates',
      icon: Icons.sports_soccer,
    ),
    Topic(
      id: '2',
      name: 'Cars',
      description: 'Everything about automobiles',
      icon: Icons.directions_car,
    ),
    Topic(
      id: '3',
      name: 'Countries',
      description: 'Explore different cultures and places',
      icon: Icons.public,
    ),
    Topic(
      id: '4',
      name: 'Technology',
      description: 'Latest tech trends and news',
      icon: Icons.computer,
    ),
    Topic(
      id: '5',
      name: 'Music',
      description: 'Music news and trending songs',
      icon: Icons.music_note,
    ),
    Topic(
      id: '6',
      name: 'Movies',
      description: 'Film reviews and entertainment news',
      icon: Icons.movie,
    ),
    Topic(
      id: '7',
      name: 'Food',
      description: 'Recipes and culinary experiences',
      icon: Icons.restaurant,
    ),
    Topic(
      id: '8',
      name: 'Science',
      description: 'Scientific discoveries and research',
      icon: Icons.science,
    ),
    Topic(
      id: '9',
      name: 'Health',
      description: 'Health and wellness information',
      icon: Icons.health_and_safety,
    ),
    Topic(
      id: '10',
      name: 'Sports',
      description: 'General sports news and updates',
      icon: Icons.sports,
    ),
  ];

  Future<void> _toggleSubscription(Topic topic) async {
    try {
      if (!topic.isSubscribed) {
        // Subscribe to the topic
        await FirebaseMessaging.instance.subscribeToTopic(topic.id);
        print('Subscribed to topic: ${topic.id}');
      } else {
        // Unsubscribe from the topic
        await FirebaseMessaging.instance.unsubscribeFromTopic(topic.id);
        print('Unsubscribed from topic: ${topic.id}');
      }

      // Update the UI only after successful subscription/unsubscription
      setState(() {
        topic.isSubscribed = !topic.isSubscribed;
      });
    } catch (e) {
      print('Error toggling topic subscription: $e');
      // Optionally show an error message to the user
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to ${topic.isSubscribed ? 'unsubscribe from' : 'subscribe to'} ${topic.name}'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Choose Your Topics'),
        actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Center(
              child: Text(
                '${topics.where((t) => t.isSubscribed).length} selected',
                style: const TextStyle(fontSize: 16),
              ),
            ),
          ),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(8),
        itemCount: topics.length,
        itemBuilder: (context, index) {
          final topic = topics[index];
          return Card(
            margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
            child: ListTile(
              leading: Icon(
                topic.icon,
                size: 30,
                color: topic.isSubscribed ? Theme.of(context).primaryColor : Colors.grey,
              ),
              title: Text(
                topic.name,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(topic.description),
              trailing: ElevatedButton(
                onPressed: () => _toggleSubscription(topic),
                style: ElevatedButton.styleFrom(
                  backgroundColor: topic.isSubscribed 
                    ? Colors.red.shade100 
                    : Theme.of(context).primaryColor,
                ),
                child: Text(
                  topic.isSubscribed ? 'Unsubscribe' : 'Subscribe',
                  style: TextStyle(
                    color: topic.isSubscribed 
                      ? Colors.red 
                      : Colors.white,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}