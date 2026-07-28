-- Seed Initial Services and Portfolio Items into PostgreSQL

INSERT INTO services (id, title, description, tag, image, features, stats, order_index) VALUES
('content-creation', 'Content Creation', 'Creative concepts and branded content designed to tell your story clearly.', 'Creative', '/images/sevices/content creation.png', '["Content strategy and ideation", "Brand-first copy and captions", "Platform-ready creative assets"]'::jsonb, '[{"value": "1.2K+", "label": "Assets Created"}, {"value": "40+", "label": "Brand Systems"}, {"value": "98%", "label": "Client Retention"}]'::jsonb, 1),
('video-production', 'Video Production', 'End-to-end video production for campaigns, social content, and branded storytelling.', 'Video', '/images/sevices/video production.png', '["Creative direction and scripting", "Shoot planning and production", "Editing, motion, and delivery"]'::jsonb, '[{"value": "300+", "label": "Videos Produced"}, {"value": "50+", "label": "Campaign Films"}, {"value": "95%", "label": "On-Time Delivery"}]'::jsonb, 2),
('visual-ads', 'Visual Ads', 'High-impact ad creatives crafted to stop the scroll and drive action.', 'Design', '/images/sevices/visualadss.png', '["Static and motion ad creatives", "Multi-format ad variants", "Creative testing support"]'::jsonb, '[{"value": "900+", "label": "Ad Creatives"}, {"value": "120+", "label": "Campaign Sets"}, {"value": "3.9×", "label": "CTR Lift"}]'::jsonb, 3),
('social-media-management', 'Social Media Management', 'Consistent social presence through strategy, posting, and audience engagement.', 'Social', '/images/sevices/social media management.png', '["Monthly social media planning", "Content calendar and publishing", "Community management"]'::jsonb, '[{"value": "180+", "label": "Accounts Managed"}, {"value": "2M+", "label": "Audience Reach"}, {"value": "4.8×", "label": "Engagement Lift"}]'::jsonb, 4),
('brand-shoots', 'Brand Shoots', 'Professional photo and video shoots that elevate your brand identity.', 'Branding', '/images/sevices/brand shoots.png', '["Concept and moodboard planning", "On-location or studio shoots", "Brand-ready media selection"]'::jsonb, '[{"value": "120+", "label": "Brand Shoots"}, {"value": "2.5K+", "label": "Final Visuals"}, {"value": "96%", "label": "Client Satisfaction"}]'::jsonb, 5),
('performance-marketing', 'Performance Marketing', 'Data-driven paid and retention campaigns focused on conversions and measurable growth.', 'Paid Growth', '/images/sevices/perfomance marketing.png', '["Meta Ads", "Google Ads", "WhatsApp Campaigns", "Email Marketing"]'::jsonb, '[{"value": "250+", "label": "Campaigns"}, {"value": "500M+", "label": "Reach"}, {"value": "3.2×", "label": "Avg. ROAS"}]'::jsonb, 6)
ON CONFLICT (id) DO NOTHING;

DELETE FROM portfolio_items;

INSERT INTO portfolio_items (id, title, client, category, type, industry, result, description, image, video_src, aspect, span, featured, order_index) VALUES
('vp-hero-intro', 'Brand Identity Hero Intro', 'Bougain Mediaa', 'Hospitality & Events', 'video', 'Brand Film', '', '', '', '/videos/hero-intro.webm', '16:9', 'lg', true, 1),
('vp-studio-cinematic', 'Scandinavian Architecture Walkthrough', 'Emarath Interiors', 'Real Estate & Interiors', 'video', 'Architecture', '', '', '', '/videos/Firefly Ultra-realistic cinematic luxury digital marketing agency office, modern Scandinavian creati.webm', '16:9', 'md', true, 2),
('vp-storytelling-agency', 'Creative Studio Storytelling', 'Bougain Mediaa', 'Food & Brand Shoots', 'video', 'Creative Agency', '', '', '', '/videos/Firefly Ultra-realistic premium storytelling and digital marketing agency, creative professionals ca.webm', '16:9', 'lg', true, 3),
('ai-easter-video', 'Easter Festival Campaign', 'Brand Client', 'Food & Brand Shoots', 'video', 'AI Concept', '', '', '', '/videos/AI/EASTER VIDEO.webm', '16:9', 'lg', true, 4),
('ai-toms-pipes-concept', 'Toms Pipes Concept Ad', 'Toms Pipes', 'EdTech & Tech', 'video', 'AI Concept', '', '', '', '/videos/AI/TOMS PIPES CONCEPT AD.webm', '16:9', 'md', true, 5),
('ai-hayyak-ad', 'Hayyak Brand Commercial', 'Hayyak', 'Hospitality & Events', 'video', 'AI Concept', '', '', '', '/videos/AI/HAYYAK AD VIDEO.webm', '16:9', 'md', true, 6),
('ai-kitkat-ad', 'KitKat Chocolate Reel', 'KitKat', 'Food & Brand Shoots', 'video', 'AI Concept', '', '', '', '/videos/AI/kitkat ad stibe final.webm', '16:9', 'lg', true, 7),
('ai-toms-pipes', 'Toms Pipes Industrial Ad', 'Toms Pipes', 'EdTech & Tech', 'video', 'AI Concept', '', '', '', '/videos/AI/toms pipes.webm', '16:9', 'md', false, 8),
('ai-mango-bite', 'Mango Bite Confectionery', 'Mango Bite', 'Food & Brand Shoots', 'video', 'AI Concept', '', '', '', '/videos/AI/mango bite ad.webm', '16:9', 'md', false, 9),
('ai-solar-extrawatt', 'Extrawatt Solar Energy', 'Extrawatt', 'EdTech & Tech', 'video', 'AI Concept', '', '', '', '/videos/AI/solar ad extrawatt.webm', '16:9', 'sm', false, 10),
('ai-toms-meteor', 'Toms Pipes Meteor Creative', 'Toms Pipes', 'EdTech & Tech', 'video', 'AI Concept', '', '', '', '/videos/AI/TOMS PIPES METEOR AD.webm', '16:9', 'sm', false, 11),
('ai-amruth-concept', 'Amruth Brand Shoot', 'Amruth', 'Food & Brand Shoots', 'video', 'AI Concept', '', '', '', '/videos/AI/AMRUTH CONCEPT AD.webm', '16:9', 'lg', true, 12),
('ai-hna-gst', 'HNA GST Advisory', 'HNA', 'EdTech & Tech', 'video', 'AI Concept', '', '', '', '/videos/AI/HNA AD GST.webm', '16:9', 'sm', false, 13),
('ai-uddiya-raihat-zuhar', 'Uddiya Raihat Al Zuhar Perfume', 'Raihat', 'Food & Brand Shoots', 'video', 'AI Concept', '', '', '', '/videos/AI/UDDIYA RAIHAT AL ZUHAR.webm', '16:9', 'md', false, 14),
('ai-raihat-al-zuhar', 'Raihat Al Zuhar Luxury Fragrance', 'Raihat', 'Food & Brand Shoots', 'video', 'AI Concept', '', '', '', '/videos/AI/RAIHAT AL ZUHAR.webm', '16:9', 'sm', false, 15),
('ai-raihat-udiyya', 'Raihat Udiyya Essence', 'Raihat', 'Food & Brand Shoots', 'video', 'AI Concept', '', '', '', '/videos/AI/RAIHAT UDIYYA.webm', '16:9', 'sm', false, 16),
('ai-udiyya-ad-raihat', 'Udiyya Raihat Commercial', 'Raihat', 'Food & Brand Shoots', 'video', 'AI Concept', '', '', '', '/videos/AI/UDIYYA ad raihat.webm', '16:9', 'sm', false, 17),
('ai-milma-ad', 'Milma Dairy Story', 'Milma', 'Food & Brand Shoots', 'video', 'AI Concept', '', '', '', '/videos/AI/milma ad.webm', '16:9', 'sm', false, 18);
