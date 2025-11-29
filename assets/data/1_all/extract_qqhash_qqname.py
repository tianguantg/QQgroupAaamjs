import json

def extract_qqhash_qqname_mapping():
    # 读取原始数据文件
    with open('data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 提取qqhash与name的对应关系
    mapping = {}
    for user in data['users']:
        qq_hash = user['qq']
        name = user['name']
        mapping[qq_hash] = name

    # 生成新的JSON文件
    output_data = {
        'qqhash_qqname_mapping': mapping,
        'total_users': len(mapping),
        'metadata': {
            'source_file': 'data.json',
            'description': 'QQ hash to name mapping extracted from users array'
        }
    }

    # 写入输出文件
    with open('qqhash_qqname_mapping.json', 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"成功提取了 {len(mapping)} 个用户的qqhash与name对应关系")
    print("输出文件已保存为: qqhash_qqname_mapping.json")

if __name__ == "__main__":
    extract_qqhash_qqname_mapping()