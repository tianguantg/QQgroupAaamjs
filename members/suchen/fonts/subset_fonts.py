import os
import re
from fontTools.subset import main as subset_main

def get_chars_from_file(path):
    if not os.path.exists(path):
        return set()
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    return set(content)

def get_chars_from_html(path):
    if not os.path.exists(path):
        return set()
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Simple regex to strip tags, script, style
    # This is rough but effective enough for capturing used characters
    content = re.sub(r'<script\b[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<style\b[^>]*>.*?</style>', '', content, flags=re.DOTALL)
    content = re.sub(r'<[^>]+>', '', content)
    return set(content)

def subset_font(font_path, text, output_path):
    # Convert set to sorted string to ensure determinism
    text_str = "".join(sorted(list(text)))
    
    # Save text to temp file to avoid command line length issues if we were using subprocess
    # But since we use library call, passing string is usually fine.
    # However, fontTools.subset loads the font and subsets it.
    
    args = [
        font_path,
        f'--text={text_str}',
        '--flavor=woff2',
        f'--output-file={output_path}',
        '--layout-features=*', 
        '--no-hinting', 
        '--desubroutinize',
    ]
    print(f"Running subset for {font_path}...")
    subset_main(args)

if __name__ == '__main__':
    # Gather characters
    chars = set()
    
    # 1. From subset-chars.txt
    chars.update(get_chars_from_file('subset-chars.txt'))
    
    # 2. From ../index.html (just to be safe)
    chars.update(get_chars_from_html('../index.html'))
    
    # 3. Ensure basic ASCII is included (sometimes useful for fallback/js)
    chars.update(set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:'\",.<>?/~` "))

    print(f"Total unique characters collected: {len(chars)}")
    
    fonts = [
        ('SourceHanSans-Regular.otf', 'SourceHanSans-Regular-subset.woff2'),
        ('SourceHanSans-Bold.otf', 'SourceHanSans-Bold-subset.woff2')
    ]
    
    for input_font, output_font in fonts:
        if os.path.exists(input_font):
            try:
                subset_font(input_font, chars, output_font)
                
                # Check size reduction
                orig_size = os.path.getsize(input_font) / (1024*1024)
                new_size = os.path.getsize(output_font) / 1024
                print(f"Reduced {input_font} ({orig_size:.2f} MB) -> {output_font} ({new_size:.2f} KB)")
            except Exception as e:
                print(f"Error processing {input_font}: {e}")
        else:
            print(f"Warning: {input_font} not found")
